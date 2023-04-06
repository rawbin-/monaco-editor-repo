import MonacoEditor, { useMonaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { loader } from '@monaco-editor/react';
import { useEffect } from 'react';

export const STATICS_MONACO =
  process.env.NODE_ENV !== 'development'
    ? '/monaco-editor/min/vs'
    : '/node_modules/monaco-editor/min/vs';

// 文档：https://github.com/suren-atoyan/monaco-react#readme
export default function CodeEditor({ value, onChange, ...restProps }: any) {
  useEffect(() => {
    // loader.config({ monaco });
    loader.config({ paths: { vs: '/monaco-editor/min/vs' } });
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
