import React, { Component } from "react";

type TodoTreeProps = {
    setPage : (page: "main" | "entry" | "view" | "tree") => void;
}

type TodoTreeState = {

}

export class TodoTree extends Component<TodoTreeProps, TodoTreeState> {
    constructor(props: TodoTreeProps) {
        super(props);
    }

    render = () : React.JSX.Element => {
        return (
            <div>
                <button onClick={this.onBackClick}>Back</button>
            </div>
        )
    }

    onBackClick = () : void => {
        this.props.setPage("view");
    }
}

