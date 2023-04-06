/* eslint-disable @typescript-eslint/no-shadow */
import type { ComponentProps, FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { merge } from 'lodash-es';
import type { editor } from 'monaco-editor';
import { useDeepCompareEffect } from 'ahooks';
import { Input } from 'antd';
import classNames from 'classnames';
import type { Monaco } from '@monaco-editor/react';
import MonacoEditor, { useMonaco } from '@monaco-editor/react';
import styles from './index.module.less';
import { providerSuggestions, setPlaceholder } from './utils';
import { EditorHighlightLanguage } from './type';
import sqlKeyword from './keyword/sql';

const { TextArea } = Input;
type ITextArea = ComponentProps<typeof TextArea>;

interface Props extends ComponentProps<typeof MonacoEditor> {
  textArea?: ITextArea | true;
  /** 支持高亮的语言 */
  language?: EditorHighlightLanguage;
  placeholder?: string;
  hints?: string[];
}
let provider = {
  dispose: () => {},
};

// 文档：https://github.com/suren-atoyan/monaco-react#readme
const Editor: FC<Props> = ({
  value,
  textArea,
  placeholder,
  height: initHeight,
  width,
  options,
  onMount,
  language,
  hints = [],
  ...rest
}) => {
  // 文档: https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html
  const defaultOptions: editor.IStandaloneEditorConstructionOptions = {
    contextmenu: false, // 右键上下文
    readOnly: true,
    minimap: {
      enabled: false, // 小地图
    },
    automaticLayout: true,
    scrollbar: {
      vertical: 'auto',
    },
  };
  const mergeOptions = merge(defaultOptions, options);
  const [height, setHeight] = useState(initHeight ?? '200px');
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monaco = useMonaco();

  useEffect(() => {
    return () => {
      provider.dispose();
    };
  }, []);

  useDeepCompareEffect(() => {
    if (hints.length > 0 && monaco && language) {
      provider = providerSuggestions(monaco, {
        language,
        hints,
      });
    }
  }, [hints]);

  useEffect(() => {
    // 设置placeholder
    setPlaceholder(editorRef.current, value ? '' : placeholder);
  }, [value, placeholder]);

  const handleResize = ({ height }: { width: number; height: number }) => {
    setHeight(height);
  };

  useEffect(() => {
    setHeight(initHeight as any);
  }, [initHeight]);

  const handleHints = (monaco: Monaco) => {
    // 传hints时
    if (hints?.length && language) {
      provider = providerSuggestions(monaco, {
        language,
        hints,
      });
    } else if (language === 'sql') {
      // sql 默认关键字
      provider = provider = providerSuggestions(monaco, {
        language,
        hints: sqlKeyword,
      });
    }
  };

  const handleMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) => {
    editorRef.current = editor;
    if (placeholder) {
      const value = editor.getValue();
      // 设置placeholder
      setPlaceholder(editorRef.current, value ? '' : placeholder);
    }
    handleHints(monaco);
    onMount?.(editor, monaco);
  };
  return (
    <div
      className={classNames(styles.Editor, 'monaco-editor-container')}
      style={{
        height,
        width: width ?? '100%',
      }}
    >
      <MonacoEditor
        width="100%"
        height="100%"
        language={language}
        theme="vs-dark"
        value={value}
        options={mergeOptions}
        onMount={handleMount}
        {...rest}
      />
      {textArea && (
        <TextArea
          className={classNames(styles.TextArea, 'monaco-editor-textarea')}
          onResize={handleResize}
          disabled
          style={{
            height,
          }}
          {...(typeof textArea === 'boolean' ? {} : textArea)}
        />
      )}
    </div>
  );
};

export default Editor;
