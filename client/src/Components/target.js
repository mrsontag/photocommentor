import React from 'react';

const Target = props => {
    const { xloc, yloc, diam, active, hidden = false, onClick, text="" } = props;
    let showdiam = Math.max(diam, 10);
    if(typeof(showdiam)!== "number") { showdiam = 10};

    let onClickPassed;
    onClick ? onClickPassed = onClick : onClickPassed = () => {};

    return (
        <div style={{
            display: hidden ? "none" : "block",
            position: "absolute",
            border: active ? "3px solid red" : "3px dashed white",
            top: yloc - (showdiam / 2) + "px",
            left: xloc - (showdiam / 2) + "px",
            borderRadius: showdiam + "px",
            width: showdiam - 3 + "px",
            height: showdiam - 3 + "px",
            padding: diam / 8 + "px",
            margin: "0px",
            color: "white",
        }} onClick={onClickPassed} onMouseDown={(e) => e.stopPropagation()}>
            {text}
        </div>
    )
}

export default Target;