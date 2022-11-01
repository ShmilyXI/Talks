import React, { useState, useEffect, FC, useMemo, useRef } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { DomEditor, IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import _ from "lodash";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

interface IProps {
  toolbarConfig?: Partial<IToolbarConfig>;
  editorConfig?: Partial<IEditorConfig>;
  onChange?: (value: string) => void;
}

const BaseEditor: FC<IProps> = (props) => {
  const { onChange } = props;
  const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法

  // 编辑器内容
  const [html, setHtml] = useState<string>();

  useEffect(() => {
    return () => {
      // 及时销毁 editor ，重要！
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <div style={{ border: "1px solid #eaeaea", zIndex: 100 }}>
        <Toolbar editor={editor} defaultConfig={props?.toolbarConfig} mode="default" style={{ borderBottom: "1px solid #eaeaea" }} />
        <Editor
          defaultConfig={props?.editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => {
            const isEmpty = editor.isEmpty();
            const nowHtml = editor.getHtml();
            setHtml(nowHtml);
            onChange?.(!isEmpty ? nowHtml : undefined);
          }}
          mode="default"
          style={{ height: "220px", overflowY: "hidden" }}
          {..._.omit(props, ["onChange"])}
        />
      </div>
    </>
  );
};

export default BaseEditor;
