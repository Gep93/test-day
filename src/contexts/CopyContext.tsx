import React, { createContext, useState } from "react";

// interface IContextProps {
//   copied?: string;
//   changeCopied?: (val: string) => void;
// }
// const contextObj: IContextProps = { copied: "",  };

// export interface PostsContextData {
//     posts: Post[];
//     isLoading: boolean;
//     fetchPosts: () => void;
//     removePost: (postId: number) => void;
//   }

//   export const postsContextDefaultValue: PostsContextData = {
//     posts: [],
//     isLoading: false,
//     fetchPosts: () => null,
//     removePost: () => null
//   }

//   export const PostsContext = createContext<PostsContextData>(postsContextDefaultValue);

interface ICopyContext {
  copied: string;
  changeCopied: (copied: string) => void;
}

const copyContextDefaultValue: ICopyContext = {
  copied: "",
  changeCopied: () => null,
};

export const CopyContext = createContext(copyContextDefaultValue);

export function CopyProvider(props: any) {
  const [copied, setCopied] = useState("");
  const changeCopied = (copied: string) => {
    setCopied(copied);
  };

  return (
    <CopyContext.Provider value={{ copied, changeCopied }}>
      {props.children}
    </CopyContext.Provider>
  );
}
