import React, { Component } from "react";

type EntryProps = {
    setPage : (page: "main" | "entry" | "view" | "tree") => void,
    addToList : (entry: string) => void;
    clearList : () => void;
    removeFromList : (index: number) => void;
    list: string[];

    doSetList : () => void;
};

type EntryState = {
    item: string;
};

export class Entry extends Component<EntryProps, EntryState> {
    constructor(props: EntryProps) {
        super(props);

        this.state = {item: ""};
    }

    render = () : React.JSX.Element => {
        return (
            <div>
                <button onClick={this.onBackClick}>Back</button>
                <input value={this.state.item} onChange={this.onInputChange} onKeyDown={this.onSubmission} 
                    placeholder={"Enter your to-do item"}/>
                <this.generateList></this.generateList>
                <button onClick={this.onClearClick}>Clear</button>
                <button onClick={this.onSaveClick}>Save</button>
            </div>
        );
    }

    onBackClick = () : void => {
        this.props.setPage("main");
    }

    onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) : void => {
        this.setState({item: evt.currentTarget.value});
    }

    onSubmission = (evt: React.KeyboardEvent<HTMLInputElement>) : void => {
        if (evt.key === "Enter") {
            this.props.addToList(this.state.item);
            this.setState({item: ""})
        }
    }

    generateList = () : React.JSX.Element => {
        return (
            <ul>
                {this.props.list.map((entry, index) => (
                        <li key={index}>
                            {entry}
                            <button onClick={() => this.onDeleteClick(index)}>Delete</button>
                        </li>
                ))}
            </ul>
        );
    }

    onClearClick = () : void => {
        this.props.clearList();
    }

    onDeleteClick = (index: number) : void => {
        this.props.removeFromList(index);
    }

    onSaveClick = () : void => {
        this.props.doSetList();
    }
}