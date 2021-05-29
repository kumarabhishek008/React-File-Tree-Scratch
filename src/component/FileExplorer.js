import React, { useEffect, useState } from "react";
import File from "./File";
import Folder from "./Folder";
import { dataStructure } from "../utils/constants";
import ReactDOM from 'react-dom';
import "./file-explorer.css";
import Tree from 'react-ui-tree'

const FileExplorer = () => {
    
  const [fileTree, setFileTree] = useState(dataStructure);
  const [activefolder, setActivefolder] = useState(null);
  const [flag, setflag] = useState(false);
  const [arr, setarr] = useState([])
  var folder = null;
  const onClickFolder = (data) => {
    console.log(data);
    setActivefolder({...data});
    folder=data;
    setflag(!flag);
    getObject(fileTree);
  };
  const setData = (data) => {
    console.log(data);
    setFileTree({...fileTree,collapsed:data.collapsed})
  }
  /** get object */
  const getObject = (data) => {
      const tree = data.children;
      for(var i=0;i<tree.length;i++){
        if(tree[i].id===folder.id){
          tree[i].collapsed=folder.collapsed;
          if(folder.parent === fileTree.id){
            setFileTree({...fileTree,children:[...tree]});
          }
          break;
        }else if(tree[i].children && tree[i].children.length){
          getObject(tree[i]);
        }
      }
  }
  
  return (
    <div className="file-explorer">
      This is File Explorer
      <div className="file-tree">
        {fileTree &&
        fileTree.module &&
        fileTree.children &&
        fileTree.children.length ? (
          <Folder
            folderName={fileTree.module}
            data={fileTree}
            setData={setData}
          />
        ) : (
          <File fileName={fileTree.module} />
        )}
        <div className="sub-folder">
          {!fileTree.collapsed && fileTree.children && DrawTree(fileTree,onClickFolder)}
        </div>
      </div>
    </div>
  );
};

const DrawTree = (data,onClickFolder) => {
  const setData = (data) => {
    if (data) {
      console.log(data);
      onClickFolder(data);
    }
  };

  if (data && data.children) {
    return (
      <>
        {data.children.map((ele) => {
          if (ele.children)
            return (
              <>
                <Folder folderName={ele.module} data={ele} setData={setData} />
                <div className='sub-folder-tree'>
                  {
                    !ele.collapsed && DrawTree(ele,onClickFolder)
                  }
                </div>
              </>
            );
          if (ele.leaf) return <File fileName={ele.module} />;
        })}
      </>
    );
  } else if (data.leaf) {
    return <File fileName={data.module} />;
  } else if (!data) {
    return "";
  }
};


export default FileExplorer;
