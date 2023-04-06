import MonacoEditor, { MonacoEditorProps } from 'react-monaco-editor';
import React from 'react';

export default function CodeEditor({
  value,
  onChange,
  ...restProps
}: MonacoEditorProps) {
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
