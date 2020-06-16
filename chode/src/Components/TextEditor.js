import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';



require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');




const TextEditor = () => {
    return (
        <div className="Editor">
            <h2>Type code in the box</h2>
            <CodeMirror
            className="Editor"
                  value='console.log(hello world)'
                  options={{
                    mode: 'javascript',
                    theme: 'material',
                    lineNumbers: true
                  }}
                onChange={(editor, value) => {
                    console.log('uncontrolled', { value });
                }}
            />
        </div>
    );
};

export default TextEditor;