import React, { useReducer, useState } from 'react'

const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return {
                ...state,
                count: state.count + 1,
            }
        case 'decrement':
            return {
                ...state,
                count: state.count - 1,
            }
        case 'value-to-add':
            return {
                ...state,
                valueToAdd: action.payload,
            }
        case 'add-value-to-count':
            return {
                ...state,
                count: state.count + state.valueToAdd,
                valueToAdd: 0,
            }
        default:
            return {
                ...state,
            }
    }
};

function CounterPage() {
    const [state, dispatch] = useReducer(reducer, {
        count: 0,
        valueToAdd: 0,
    })

    const handleSubmitForm = (event) => {
        event.preventDefault();
        dispatch({
            type: "add-value-to-count",
        })
    };

    const handleChange = (event) => {
        const value = event.target.value;
        dispatch({
            type: 'value-to-add',
            payload: parseInt(value),
        })
    };

    console.log('CountPage', state);

    return (
        <div>
            <h1>{state.count}</h1>
            <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
            <br />
            <form onSubmit={handleSubmitForm}>
                <input value={state.valueToAdd || ''} type='number' onChange={handleChange} />
                <button type='submit'>Submit</button>
            </form>

        </div>
    )
}

export default CounterPage