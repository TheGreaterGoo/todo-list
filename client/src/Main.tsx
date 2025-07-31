import React, { Component } from "react";

type MainProps = {
    page: "main" | "entry" | "view";
    setPage : (page: "main" | "entry" | "view") => void;
};

type MainState = {
    
};

export class Main extends Component<MainProps, MainState>{
    constructor(props: MainProps){
        super(props);
    };

    render = () : React.JSX.Element => {
        return (
            <div>
                <button onClick={this.onEntryClick}>Entry</button>

                <button onClick={this.onViewClick}>View</button>
            </div>
        )
    }

    onEntryClick = () : void => {
        this.props.setPage("entry");
    }

    onViewClick = () : void => {
        this.props.setPage("view");
    }
}