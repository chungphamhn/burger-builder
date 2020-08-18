import React from 'react';
import './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClassName = ["InputElement"];

    //console.log(props.invalid, props.elementType !== 'select', props.touched);
    if (props.invalid && props.elementType !== 'select' && props.touched) {
         
        inputClassName.push("Invalid");
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClassName.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClassName.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClassName.join(' ')}
                    value={props.value}
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map(
                        option => (
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        )
                    )}

                </select>
            );
            break;
        default:
            inputElement = <input className={inputClassName.join(' ')} {...props.elementConfig} value={props.value} />;
            break;
    }

    return (

        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;