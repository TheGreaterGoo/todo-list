import React, { Component } from "react";
import { Main } from "./Main";
import { Entry } from "./Entry";
import { View } from "./View";
import { TodoTree } from "./TodoTree";
import { isRecord } from "./record"

type AppProps = {}; // No props!

type AppState = {
    page: "main" | "entry" | "view" | "tree";
    list: string[];
};

export class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        // set initial App state
        this.state = {
            page: "main",
            list: []
        };
    }

    componentDidMount(): void {
        fetch("api/getList", {method: "GET", headers: {"Content-Type": "application/json"}})
            .then(this.doGetListResp)
            .catch(this.doGetListError)
    }

    render = () : React.JSX.Element => {
        if (this.state.page === "main") {
            return <Main page={"main"} setPage={this.setPage}></Main>
        } else if (this.state.page === "entry") {
            return <Entry setPage={this.setPage} addToList={this.addToList} list={this.state.list} 
                        clearList={this.clearList} removeFromList={this.removeFromList} doSetList={this.doSetList}></Entry>
        } else if (this.state.page === "view") {
            return <View setPage={this.setPage}></View>
        } else {
            return <TodoTree setPage={this.setPage}></TodoTree>
        }
    }

    setPage = (page: "main" | "entry" | "view" | "tree") : void => {
        this.setState({page: page})
    }

    addToList = (entry: string) : void => {
        this.setState({
            list: [...this.state.list, entry]
        });
    }

    clearList = () : void => {
        this.setState({
            list: []
        });
    }

    removeFromList = (index: number) : void => {
        this.setState({
            list: this.state.list.filter((_, i) => i !== index)
        });
    }

    doGetListResp = (res: Response) : void => {
        if (res.status !== 200) {
            res.text()
                .then((msg: string) => this.doGetListError(`bad status code: ${res.status}: ${msg}`))
                .catch(() => this.doGetListError(`${res.status} response is not text`))
        } else {
            res.json()
                .then(this.doGetListJson)
                .catch(() => this.doSetListError(`${res.status} response is not JSON`))
        }
    }

    doGetListJson = (data: unknown) : void => {
        if (!isRecord(data) || data.todoList === undefined) {
            this.doGetListError("response is not in expected form");
        } else {
            if (data.todoList !== undefined && Array.isArray(data.todoList)) {
                const todoList : string[] = [];
                for (const item of data.todoList) {
                    if (typeof item !== "string") {
                        throw Error(`item is not a string: ${typeof item}`);
                    }
                    todoList.push(item);
                }
                this.setState({list: todoList});
            }
        }
    }

    doGetListError = (msg: string, ex?: unknown) : void => {
        console.error(`fetch of /api/getList failed: ${msg}`)
        if (ex instanceof Error) {
            throw ex;
        }
    }

    doSetList = () : void => {
        fetch("/api/setList", 
            {
                method: "PUT",   
                headers: {
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify({todoList: this.state.list})
            })
            .then(this.doSetListResp)
            .catch((ex) => this.doSetListError("failed to connect", ex))
    }

    doSetListResp = (res: Response) : void => {
        if (res.status !== 200) {
            res.text()
                .then((msg: string) => this.doSetListError(`bad status code: ${res.status}: ${msg}`))
                .catch(() => this.doSetListError(`${res.status} response is not text`))
        } else {
            res.json()
                .then(this.doSetListJson)
                .catch(() => this.doSetListError(`${res.status} response is not JSON`))
        }
    }

    doSetListJson = (data: unknown) : void => {
        if (!isRecord(data) || typeof data.saved !== "boolean") { 
            this.doSetListError("response is not in expected form");
        } else {
            console.log("To-do list SAVED to server")
        }
    }

    doSetListError = (msg: string, ex?: unknown) : void => {
        console.error(`fetch of /api/setList failed: ${msg}`)
        if (ex instanceof Error) {
            throw ex;
        }
    }
}