import MonacoEditor, { MonacoEditorProps } from 'react-monaco-editor';
import React, { useEffect } from 'react';

import loader from '@monaco-editor/loader';

// export const STATICS_MONACO = process.env.NODE_ENV !== 'development' ? '/monaco-editor/min/vs' : '/node_modules/monaco-editor/min/vs';
// loader.config({ paths: { vs: STATICS_MONACO } });
export default function CodeEditor({
  value,
  onChange,
  ...restProps
}: MonacoEditorProps) {
  console.log('NODE_ENV', process.env.NODE_ENV);
  useEffect(() => {
    // loader.init()
  }, []);
  return (
    <MonacoEditor
      width={'100%'}
      height="100%"
      theme={'vs-dark'}
      language="json"
      value={value}
      onChange={onChange}
      {...restProps}
    />
  );
}
