import React, { Component } from "react";

type ViewProps = {
    setPage : (page: "main" | "entry" | "view" | "tree") => void;
}

type ViewState = {

}

export class View extends Component<ViewProps, ViewState> {
    constructor(props: ViewProps) {
        super(props);
    }

    render = () : React.JSX.Element => {
        return (
            <div>
                <button onClick={this.onBackClick}>Back</button>
                <button onClick={this.onTreeClick}>Tree</button>
            </div>
        )
    }

    onBackClick = () : void => {
        this.props.setPage("main");
    }

    onTreeClick = () : void => {
        this.props.setPage("tree");
    }
}