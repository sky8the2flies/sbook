import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import bundle from '../bundler';
import Preview from './preview';
import Resizable from './resizable';

const CodeCell = () => {
    const [input, setInput] = useState('');
    const [err, setErr] = useState('');
    const [code, setCode] = useState('');

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundle(input);
            setCode(output.code);
            setErr(output.err);
        }, 750);

        return () => {
            clearTimeout(timer);
        };
    }, [input]);

    return (
        <div>
            <Resizable direction="vertical">
                <div
                    style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <Resizable direction="horizontal">
                        <CodeEditor
                            initialValue="import ReactDOM from 'react-dom';
                            import React from 'react';
                            const App = () => {
                              return <h1>Hello World</h1>;
                            };
                            ReactDOM.render(<App />, document.querySelector('#root'));"
                            onChange={(value) => setInput(value)}
                        />
                    </Resizable>
                    <Preview code={code} err={err} />
                </div>
            </Resizable>
        </div>
    );
};

export default CodeCell;
