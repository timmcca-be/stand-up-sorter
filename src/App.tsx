import React, { useReducer } from 'react';
import './App.css';

type Response = {
    name: string;
    response: string;
}

type Action = {
    type: 'add';
} | {
    type: 'update';
    index: number;
    response: string;
} | {
    type: 'rename';
    index: number;
    name: string;
}

const EMPTY_RESPONSE: Response = {
    name: "",
    response: "",
};

function responsesReducer(responses: Response[], action: Action): Response[] {
    switch (action.type) {
        case 'add':
            return responses.concat([EMPTY_RESPONSE]);
        case 'update': {
            const newResponses = [...responses];
            const oldName = responses[action.index].name;
            newResponses[action.index] = {
                name: oldName,
                response: action.response,
            };
            return newResponses;
        }
        case 'rename': {
            const newResponses = [...responses];
            const oldResponse = responses[action.index].response;
            newResponses[action.index] = {
                name: action.name,
                response: oldResponse,
            };
            return newResponses;
        }
    }
}

function App() {
    const [responses, dispatch] = useReducer(responsesReducer, [EMPTY_RESPONSE]);

    return (
        <main>
            <h1>Stand-up sorter</h1>
            <form onSubmit={(event) => {
                event.preventDefault();
                dispatch({type: 'add'});
            }}>
                <div className='labels'>
                    <label>Name</label>
                    <label>Response</label>
                </div>
                {responses.map((response, index) => (
                    <fieldset>
                        <input
                            autoFocus
                            onChange={(event) => dispatch({
                                type: 'rename',
                                index, 
                                name: event.target.value,
                            })}
                            value={response.name}
                        />
                        <input
                            onChange={(event) => dispatch({
                                type: 'update',
                                index, 
                                response: event.target.value,
                            })}
                            value={response.response}
                        />
                    </fieldset>
                ))}
                <button>Add</button>
            </form>
            {responses
                .filter((response) => response.name !== "" && response.response !== "")
                .sort((a, b) => a.response.localeCompare(b.response))
                .map((response) => (
                    <p>{response.name}: {response.response}</p>
                ))}
        </main>
    );
}

export default App;
