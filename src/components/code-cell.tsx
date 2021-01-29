import { useState } from 'react';
import CodeEditor from './code-editor';
import bundle from '../bundler';
import Preview from './preview';
import Resizable from './resizable';

const CodeCell = () => {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const onClick = async () => {
        const output = await bundle(input);
        setCode(output);
    };

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

                            const App = () => {
                              return <h1>Hello World</h1>;
                            };
                            
                            ReactDOM.render(App, document.querySelector('#root'));"
                            onChange={(value) => setInput(value)}
                        />
                    </Resizable>
                    <Preview code={code} />
                </div>
            </Resizable>
        </div>
    );
};

export default CodeCell;
