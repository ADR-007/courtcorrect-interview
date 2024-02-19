import {
    Category,
    Component,
    Variant,
    Palette,
} from "@react-buddy/ide-toolbox";
import MUIPalette from "@react-buddy/palette-mui";
import React, {Fragment} from "react";

export const PaletteTree = () => (
    <Palette>
        <Category name="App">
            <Component name="Loader">
                <Variant>
                    <ExampleLoaderComponent/>
                </Variant>
            </Component>
        </Category>
        <MUIPalette/>
    </Palette>
);

export function ExampleLoaderComponent() {
    return (
        <>Loading...</>
    );
}