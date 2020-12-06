const fs = require("fs");

const mainScreen = (screen) => {
  const smallName = screen.charAt(0).toLowerCase() + screen.slice(1);

  return `import React, { useEffect } from "react";
      import { useAuth, useNavigation } from "react-auth-navigation";

      // ACTIONs
      import { connect } from "react-redux";
      import { bindActionCreators } from "redux";
      import { get${screen}Action, delete${screen}Action } from "../../actions/Actions";
      
      // HOCS
      import CompWrapper from "../hocs/CompWrapper.hoc";
      
      // COMMON
      import { InvertedButton } from "../common/button/Button.common";
      import Table from "../common/table/Table.common";
      
      // HELPER
      import { FILE_URL } from "../../config/Config";
      
      const ${screen}Page = (props) => {
        const { get${screen}Action, delete${screen}Action, ${smallName} } = props;
        const { listLoader, listCount, list, deleteLoader } = ${smallName};
        const { location, navigation } = useNavigation();
        const { toast } = useAuth();
        const { navigate, routes } = navigation;
        let query = useQuery();
      
        function useQuery() {
          return new URLSearchParams(location?.search);
        }
        const pageNumber = query.get("page") || 1;
      
        useEffect(() => {
          get${screen}Action(pageNumber);
        }, [get${screen}Action, pageNumber]);
      
        const deleteHandler = (id) => {
          console.log("delete id", id);
          delete${screen}Action(id, toast, pageNumber);
        };
      
        const editHandler = (id) => {

        };
      
        return (
          <CompWrapper>
            <div className="newspage-container">
              <div className="newspage">
                <div className="newspage-head">
                  <div className="newspage-head-title">${screen}</div>
                  <div className="newspage-head-button">
                    <div style={{ width: 100 }}>
                      <InvertedButton
                        title="Add"
                        onClick={() => {
                          navigate(routes["Add ${screen}"].path);
                        }}
                      />
                    </div>
                  </div>
                </div>
      
                <div className="newspage-list">
                  <Table
                    columns={[
                      {
                        field: "thumbnail",
                        render: (rowData) => (
                          <img
                            alt="thumbnail"
                            src={FILE_URL + rowData}
                            style={{ height: 100, borderRadius: 4 }}
                          />
                        ),
                      },
                      {
                        field: "description",
                        name: "title",
                        render: (rowData) => <p>{rowData?.title?.en}</p>,
                      },
                      {
                        field: "description",
                        render: (rowData) => <p>{rowData?.shortDesc?.en}</p>,
                      },
                      {
                        field: "description",
                        name: "date",
                        render: (rowData) => <p>{rowData?.date?.en}</p>,
                      },
                    ]}
                    data={list}
                    actions
                    dataLoader={listLoader}
                    totalCount={listCount}
                    deleteLoader={deleteLoader}
                    onDeleteHandler={deleteHandler}
                    onEditHandler={editHandler}
                  />
                </div>
              </div>
            </div>
          </CompWrapper>
        );
      };
      
      const mapStateToProps = (state) => {
        return {
          ${smallName}: state.${smallName},
        };
      };
      const mapDispatchToProps = (dispatch) => {
        return bindActionCreators(
          {
            get${screen}Action,
            delete${screen}Action,
          },
          dispatch,
        );
      };
      
      export default connect(mapStateToProps, mapDispatchToProps)(${screen}Page);
      `;
};

const addScreenMaker = (screen) => {
  const smallName = screen.charAt(0).toLowerCase() + screen.slice(1);

  return `import React, { useState } from "react";
        import ImageUploading from "react-images-uploading";
        import { useAuth, useNavigation } from "react-auth-navigation";
        import { useForm } from "react-hook-form";
        import { AiFillCloseCircle } from "react-icons/ai";
        
        // MATERIAL
        import { Button } from "@material-ui/core";
        
        // ACTIONS
        import { connect } from "react-redux";
        import { bindActionCreators } from "redux";
        import { post${screen}Action } from "../../../actions/Actions";
        
        // HOCS
        import CompWrapper from "../../hocs/CompWrapper.hoc";
        import ActivityIndicator from "../../hocs/ActivityIndicator.hoc";
        
        // COMMON
        import {
          InputField,
          TextAreaField,
        } from "../../common/inputField/InputField.common";
        import { InvertedButton } from "../../common/button/Button.common";
        
        // HELPERS
        import { validator, isValid } from "../../../utils/Validator.util";
        
        const Add${screen}Page = (props) => {
          const { navigation } = useNavigation();
          const { toast } = useAuth();
          const { navigate, routes } = navigation;
          const { post${screen}Action, ${smallName} } = props;
          const { addLoader } = ${smallName};
          const { handleSubmit, register } = useForm();
        
          const [image, setImage] = useState([]);
          const [imageError, setImageError] = useState(false);
          const onChange = (imageList) => {
            setImageError(false);
            setImage(imageList);
          };
        
          const onChangeHandler = (event) => {
            // if (event.target.files.length) {
            //   setFileName(event.target.files[0].name);
            //   setFile(event.target.files);
            // }
          };
        
          const onSubmit = (data) => {
            const catchedErros = {};
            const validate = validator(catchedErros);
        
            // VALIDATION
            validate("imageFile", image?.length === 0, () => {
              toast({ message: "Image is Required", type: "error" });
            });
        
        
            if (!isValid(catchedErros)) {
              console.error(catchedErros);
              return;
            }
        
            const formdata = new FormData();
        
            formdata.append("title", "this is title");
            image.length > 0 &&
              image.forEach((element) => {
                formdata.append("imageFile", element.file);
              });
        
            post${screen}Action(formdata, goBackHandler, toast);
          };
        
          const goBackHandler = () => {
            navigate(routes.${screen}.path);
          };
        
          return (
            <CompWrapper>
              <div className="addnews-container">
                <div className="addnews">
                  <form className="addnews-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="addnews-form-input">
                      <div className="addnews-form-input-label">Title</div>
        
                      <InputField
                        name="titleEng"
                        placeholder="Title"
                        innerRef={register({ required: true })}
                      />
                    </div>

        
                    <ImageUploading value={image} onChange={onChange} multiple={true}>
                      {({ imageList, onImageUpload, onImageRemove }) => (
                        <div className="upload__image-wrapper">
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns:
                                "repeat( auto-fill, minmax(200px, 1fr) )",
                              columnGap: 10,
                            }}>
                            {imageList.map((image, index) => (
                              <div
                                key={index}
                                style={{
                                  position: "relative",
                                  width: 200,
                                  height: 200,
                                  overflow: "hidden",
                                }}>
                                <img
                                  src={image.dataURL}
                                  alt=""
                                  style={{
                                    width: "100%",
                                    objectFit: "cover",
                                    overflow: "hidden",
                                  }}
                                />
                                <AiFillCloseCircle
                                  onClick={() => onImageRemove(index)}
                                  style={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    height: 20,
                                    width: 20,
                                    color: "red",
                                    cursor: "pointer",
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                          <Button
                            className="fixedwidth"
                            onClick={onImageUpload}
                            variant="contained"
                            color="primary">
                            {image?.length > 0 ? "Change Image" : "Upload image"}
                          </Button>
                          {imageError && <div>Image Required</div>}
                        </div>
                      )}
                    </ImageUploading>
        
                    <ActivityIndicator animating={addLoader}>
                      <Button
                        className="fixedwidth"
                        variant="contained"
                        color="primary"
                        type="submit">
                        Submit
                      </Button>
                    </ActivityIndicator>
                  </form>
                </div>
              </div>
            </CompWrapper>
          );
        };
        
        const mapStateToProps = (state) => {
          return {
            ${smallName}: state.${smallName},
          };
        };
        const mapDispatchToProps = (dispatch) => {
          return bindActionCreators(
            {
              post${screen}Action,
            },
            dispatch,
          );
        };
        
        export default connect(mapStateToProps, mapDispatchToProps)(Add${screen}Page);
        `;
};

const editScreenMaker = (screen) => {
  const smallName = screen.charAt(0).toLowerCase() + screen.slice(1);
  return `import React, { useEffect, useState } from "react";
      import ImageUploading from "react-images-uploading";
      import { useAuth, useNavigation } from "react-auth-navigation";
      import { useForm } from "react-hook-form";
      import { AiFillCloseCircle } from "react-icons/ai";
      
      // MATERIAL
      import { Button } from "@material-ui/core";
      
      // ACTIONS
      import { connect } from "react-redux";
      import { bindActionCreators } from "redux";
      import { edit${screen}Action, get${screen}DetailAction } from "../../../actions/Actions";
      
      // HOCS
      import CompWrapper from "../../hocs/CompWrapper.hoc";
      import ActivityIndicator from "../../hocs/ActivityIndicator.hoc";
      
      // COMMON
      import {
        InputField,
        TextAreaField,
      } from "../../common/inputField/InputField.common";
      
      // HELPERS
      import { validator, isValid } from "../../../utils/Validator.util";
      
      //CONFIG
      import { FILE_URL } from "../../../config/Config";
      
      const Edit${screen}Page = (props) => {
        const { navigation, params } = useNavigation();
        const { toast } = useAuth();
        const { navigate, routes } = navigation;
        const { edit${screen}Action, get${screen}DetailAction, ${smallName} } = props;
        const { editLoader, detail } = ${smallName};
        const { handleSubmit, register } = useForm();
      
        const [image, setImage] = useState([]);
        const [imageError, setImageError] = useState(false);
      
        const [defaultImage, setDetfaultImage] = useState([]);
        const [deletedImage, setDeletedImage] = useState([]);
      
        useEffect(() => {
          get${screen}DetailAction(Number(params.id));
        }, [get${screen}DetailAction, params.id]);
      
        useEffect(() => {
          if (!!detail) {
      
            setDetfaultImage(detail.images);
          }
        }, [detail]);
      
        const onChange = (imageList) => {
          setImageError(false);
          setImage(imageList);
        };
      
      
        const onSubmit = (data) => {
          const catchedErros = {};
          const validate = validator(catchedErros);
      
          // VALIDATION
          validate(
            "imageFile",
            image?.length === 0 && deletedImage.length === defaultImage.length,
            () => {
              toast({ message: "Image is Required", type: "error" });
            },
          );
      
          if (!isValid(catchedErros)) {
            console.error(catchedErros);
            return;
          }
      
      
          const body = {
            title: "this is title"
          };
      
          const photoFormdata = new FormData();
      
          photoFormdata.append("title", "this is title");
          deletedImage.length > 0 &&
            photoFormdata.append("removeIndex", JSON.stringify(deletedImage));
          image.length > 0 &&
            image.forEach((element) => {
              photoFormdata.append("imageFile", element.file);
            });
      
          edit${screen}Action(
            Number(params.id),
            body,
            photoFormdata,
            goBackHandler,
            toast,
          );
        };
      
        const goBackHandler = () => {
          navigate(routes.${screen}.path);
        };
      
        const defaultImageRemove = (index) => {
          const del = [...deletedImage];
          if (!del.includes(index)) {
            del.push(index);
            setDeletedImage(del);
          }
        };
      
        return (
          <CompWrapper>
            {!detail ? (
              <div>Edit ${screen} Page Loading...</div>
            ) : (
              <div className="addnews-container">
                <div className="addnews">
                  <form className="addnews-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="addnews-form-input">
                      <div className="addnews-form-input-label">Title</div>
      
                      <InputField
                        name="title"
                        placeholder="Title"
                        innerRef={register({ required: true })}
                        defaultValue={'title default value'}
                      />
                    </div>
      
                    <ImageUploading value={image} onChange={onChange} multiple={true}>
                      {({ imageList, onImageUpload, onImageRemove }) => (
                        <div className="upload__image-wrapper">
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns:
                                "repeat( auto-fill, minmax(200px, 1fr) )",
                              columnGap: 10,
                            }}>
                            {defaultImage.map(
                              (image, index) =>
                                !deletedImage.includes(index) && (
                                  <div
                                    key={index}
                                    style={{
                                      position: "relative",
                                      width: 200,
                                      height: 200,
                                      overflow: "hidden",
                                    }}>
                                    <img
                                      src={FILE_URL + image}
                                      alt=""
                                      style={{
                                        width: "100%",
                                        objectFit: "cover",
                                        overflow: "hidden",
                                      }}
                                    />
                                    <AiFillCloseCircle
                                      onClick={() => defaultImageRemove(index)}
                                      style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        height: 20,
                                        width: 20,
                                        color: "red",
                                        cursor: "pointer",
                                      }}
                                    />
                                  </div>
                                ),
                            )}
      
                            {imageList.map((image, index) => (
                              <div
                                key={index}
                                style={{
                                  position: "relative",
                                  width: 200,
                                  height: 200,
                                  overflow: "hidden",
                                }}>
                                <img
                                  src={image.dataURL}
                                  alt=""
                                  style={{
                                    width: "100%",
                                    objectFit: "cover",
                                    overflow: "hidden",
                                  }}
                                />
                                <AiFillCloseCircle
                                  onClick={() => onImageRemove(index)}
                                  style={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    height: 20,
                                    width: 20,
                                    color: "red",
                                    cursor: "pointer",
                                  }}
                                />
                              </div>
                            ))}
                          </div>
      
                          <Button
                            className="fixedwidth"
                            onClick={onImageUpload}
                            variant="contained"
                            color="primary">
                            {image?.length > 0 ? "Change Image" : "Upload image"}
                          </Button>
                          {imageError && <div>Image Required</div>}
                        </div>
                      )}
                    </ImageUploading>
      
                    <ActivityIndicator animating={editLoader}>
                      <Button
                        className="fixedwidth"
                        variant="contained"
                        color="primary"
                        type="submit">
                        Submit
                      </Button>
                    </ActivityIndicator>
                  </form>
                </div>
              </div>
            )}
          </CompWrapper>
        );
      };
      
      const mapStateToProps = (state) => {
        return {
          ${smallName}: state.${smallName},
        };
      };
      const mapDispatchToProps = (dispatch) => {
        return bindActionCreators(
          {
            edit${screen}Action,
            get${screen}DetailAction,
          },
          dispatch,
        );
      };
      
      export default connect(mapStateToProps, mapDispatchToProps)(Edit${screen}Page);
      `;
};

const actionTypes = (screen) => {
  return `//${screen.toUpperCase()} ACTION SET
        export const ${screen.toUpperCase()} = createActionSet("${screen.toUpperCase()}")
        export const ADD_${screen.toUpperCase()} = createActionSet("ADD_${screen.toUpperCase()}")
        export const DELETE_${screen.toUpperCase()} = createActionSet("DELETE_${screen.toUpperCase()}")
        export const EDIT_${screen.toUpperCase()} = createActionSet("EDIT_${screen.toUpperCase()}")
        export const ${screen.toUpperCase()}_DETAIL = createActionSet("${screen.toUpperCase()}_DETAIL")
        `;
};

const actionsScreen = (screen) => {
  return `import { ${screen.toUpperCase()}, ADD_${screen.toUpperCase()}, DELETE_${screen.toUpperCase()}, ${screen.toUpperCase()}_DETAIL, EDIT_${screen.toUpperCase()} } from "./Actions";
        import { api, APIS, TABLE_LIMIT } from "../config/Config";
        
        export function get${screen}Action(page) {
          return async function (dispatch) {
            let res;
            try {
              dispatch({ type: ${screen.toUpperCase()}.LOADING });
              res = await api(APIS.sample);
        
              const { success, data } = res.data;
        
              if (success === "true") {
                dispatch({ type: ${screen.toUpperCase()}.SUCCESS, payload: data.data });
              } else {
                dispatch({ type: ${screen.toUpperCase()}.ERROR });
              }
            } catch ({ message }) {
              dispatch({ type: ${screen.toUpperCase()}.ERROR });
              console.error(message);
              return 0;
            }
          };
        }
        
        export function get${screen}DetailAction(id) {
          return async function (dispatch) {
            let res;
            try {
              dispatch({ type: ${screen.toUpperCase()}_DETAIL.LOADING });
              res = await api(APIS.common/id);
        
              const { success, data } = res.data;
        
              if (success === "true") {
                dispatch({ type: ${screen.toUpperCase()}_DETAIL.SUCCESS, payload: data.data });
              } else {
                dispatch({ type: ${screen.toUpperCase()}_DETAIL.ERROR });
              }
            } catch ({ message }) {
              dispatch({ type: ${screen.toUpperCase()}_DETAIL.ERROR });
              console.error(message);
              return 0;
            }
          };
        }
        
        export function post${screen}Action(formdata, goBackHandler, toast) {
          return async function (dispatch) {
            let res;
            try {
              dispatch({ type: ADD_${screen.toUpperCase()}.LOADING });
              res = await api(APIS.common, "POST", formdata, { file: true });
        
              const { success, data } = res.data;
        
              if (success === "true") {
                dispatch({ type: ADD_${screen.toUpperCase()}.SUCCESS });
                toast({ message: "${screen} successfully Added", type: "success" });
                goBackHandler();
              } else {
                dispatch({ type: ADD_${screen.toUpperCase()}.ERROR });
                toast({ message: data.message, type: "error" });
              }
            } catch ({ message }) {
              dispatch({ type: ADD_${screen.toUpperCase()}.ERROR });
              console.error(message);
              toast({ message: "Error Adding ${screen}", type: "error" });
              return 0;
            }
          };
        }
        
        export function edit${screen}Action(id, body, photoFormdata, goBackHandler, toast) {
          return async function (dispatch) {
            let res;
            try {
              dispatch({ type: EDIT_${screen.toUpperCase()}.LOADING });
              res = await api(APIS.sample/id, "PATCH", body);
        
              const { success, data } = res.data;
        
              if (success === "true") {
                let photoRes = await api(
                  APIS.common+'/image/'+id,
                  "PATCH",
                  photoFormdata,
                  { file: true },
                );
                const { success: photoSuccess, data: photoData } = photoRes.data;
                if (photoSuccess === "true") {
                  dispatch({ type: EDIT_${screen.toUpperCase()}.SUCCESS });
                  toast({ message: "${screen} successfully edited", type: "success" });
                  goBackHandler();
                } else {
                  dispatch({ type: EDIT_${screen.toUpperCase()}.ERROR });
                  toast({ message: photoData.message, type: "error" });
                }
              } else {
                dispatch({ type: EDIT_${screen.toUpperCase()}.ERROR });
                toast({ message: data.message, type: "error" });
              }
            } catch ({ message }) {
              dispatch({ type: EDIT_${screen.toUpperCase()}.ERROR });
              console.error(message);
              toast({ message: "Error editing ${screen}", type: "error" });
              return 0;
            }
          };
        }
        
        export function delete${screen}Action(id, toast, page) {
          return async function (dispatch) {
            let res;
            try {
              dispatch({ type: DELETE_${screen.toUpperCase()}.LOADING });
              res = await api(APIS.sample/id, "DELETE");
        
              const { success, data } = res.data;
        
              if (success === "true") {
                dispatch({ type: DELETE_${screen.toUpperCase()}.SUCCESS });
                toast({ message: "${screen} successfully deleted", type: "success" });
                dispatch(get${screen}Action(page));
              } else {
                dispatch({ type: DELETE_${screen.toUpperCase()}.ERROR });
                toast({ message: data.message, type: "error" });
              }
            } catch ({ message }) {
              dispatch({ type: DELETE_${screen.toUpperCase()}.ERROR });
              toast({ message: "Error Deleting ${screen}", type: "error" });
              console.error(message);
              return 0;
            }
          };
        }
        `;
};

const actionsExport = (screen) => {
  return `
  export * from "./${screen}.action.js";`;
};

const makeReducer = (screen) => {
  return `import {
        ${screen.toUpperCase()},
        ADD_${screen.toUpperCase()},
        DELETE_${screen.toUpperCase()},
        ${screen.toUpperCase()}_DETAIL,
        EDIT_${screen.toUpperCase()},
      } from "../actions/Actions";
      
      const initalState = {
        listLoader: false,
        listCount: null,
        list: [],
        addLoader: false,
        deleteLoader: false,
        editLoader: false,
        detailLoader: false,
        detail: null,
      };
      
      export function ${screen.toLowerCase()}Reducer(state = initalState, action) {
        const { type, payload } = action;
      
        switch (type) {
          // GET
          case ${screen.toUpperCase()}.LOADING:
            return {
              ...state,
              listLoader: true,
            };
          case ${screen.toUpperCase()}.SUCCESS:
            return {
              ...state,
              listLoader: false,
              listCount: payload.total,
              list: payload.rows,
            };
          case ${screen.toUpperCase()}.ERROR:
            return {
              ...state,
              listLoader: false,
            };
      
          // ${screen.toUpperCase()}_DETAIL
          case ${screen.toUpperCase()}_DETAIL.LOADING:
            return {
              ...state,
              detailLoader: true,
              detail: null,
            };
          case ${screen.toUpperCase()}_DETAIL.SUCCESS:
            return {
              ...state,
              detailLoader: false,
              detail: payload,
            };
          case ${screen.toUpperCase()}_DETAIL.ERROR:
            return {
              ...state,
              detailLoader: false,
            };
      
          case ADD_${screen.toUpperCase()}.LOADING:
            return {
              ...state,
              addLoader: true,
            };
          case ADD_${screen.toUpperCase()}.SUCCESS:
            return {
              ...state,
              addLoader: false,
            };
          case ADD_${screen.toUpperCase()}.ERROR:
            return {
              ...state,
              addLoader: false,
            };
      
          // EDIT_${screen.toUpperCase()}
          case EDIT_${screen.toUpperCase()}.LOADING:
            return {
              ...state,
              editLoader: true,
            };
          case EDIT_${screen.toUpperCase()}.SUCCESS:
            return {
              ...state,
              editLoader: false,
            };
          case EDIT_${screen.toUpperCase()}.ERROR:
            return {
              ...state,
              editLoader: false,
            };
      
          case DELETE_${screen.toUpperCase()}.LOADING:
            return {
              ...state,
              deleteLoader: true,
            };
          case DELETE_${screen.toUpperCase()}.SUCCESS:
            return {
              ...state,
              deleteLoader: false,
            };
          case DELETE_${screen.toUpperCase()}.ERROR:
            return {
              ...state,
              deleteLoader: false,
            };
      
          default:
            return state;
        }
      }
      `;
};
const sassGenerator = (screen) => {
  return `
  //${screen.toUpperCase()} STYLES
          `;
};
const sassExporter = (screen) => {
  return `
  @import "./${screen}";
          `;
};

const layoutExporter = (screen) => {
  return `
  @import "./${screen}Page/0-${screen}Page";
          `;
};

exports.dashMaker = (screen) => {
  const CURR_DIR = process.cwd();
  const pageName = screen.charAt(0).toUpperCase() + screen.slice(1);
  //Make folder
  fs.mkdirSync(`${CURR_DIR}/components/${screen}Page`);
  const screens = `${CURR_DIR}/components/${screen}Page/${pageName}Page.js`;
  fs.writeFileSync(screens, mainScreen(pageName), "utf8");

  //make add folder
  fs.mkdirSync(`${CURR_DIR}/components/${screen}Page/add${pageName}Page`);
  const addScreen = `${CURR_DIR}/components/${screen}Page/add${pageName}Page/Add${pageName}Page.js`;
  fs.writeFileSync(addScreen, addScreenMaker(pageName), "utf8");
  //Make edit Folder
  fs.mkdirSync(`${CURR_DIR}/components/${screen}Page/edit${pageName}Page`);
  const editScreen = `${CURR_DIR}/components/${screen}Page/edit${pageName}Page/Edit${pageName}Page.js`;
  fs.writeFileSync(editScreen, editScreenMaker(pageName), "utf8");

  //SASS
  fs.mkdirSync(`${CURR_DIR}/sass/Layouts/${screen}Page`);

  const sass = `${CURR_DIR}/sass/Layouts/${screen}Page/_${screen}.scss`;
  fs.appendFile(sass, sassGenerator(screen), (err) => {
    if (err) throw err;
  });
  const sass_layout = `${CURR_DIR}/sass/Layouts/${screen}Page/_0-${screen}Page.scss`;
  fs.appendFile(sass_layout, sassExporter(screen), (err) => {
    if (err) throw err;
  });
  const layout_sass = `${CURR_DIR}/sass/Layouts/_0-layouts.scss`;
  fs.appendFile(layout_sass, layoutExporter(screen), (err) => {
    if (err) throw err;
  });
  //Make action
  const action_types = `${CURR_DIR}/actions/ActionTypes.action.js`;
  fs.appendFile(action_types, actionTypes(pageName), (err) => {
    if (err) throw err;
  });

  //action page
  const actions = `${CURR_DIR}/actions/${pageName}.action.js`;
  fs.appendFile(actions, actionsScreen(pageName), (err) => {
    if (err) throw err;
  });

  //action export
  const actions_export = `${CURR_DIR}/actions/Actions.js`;
  fs.appendFile(actions_export, actionsExport(pageName), (err) => {
    if (err) throw err;
  });

  //Make Reducer
  const reducers = `${CURR_DIR}/reducers/${pageName}.reducer.js`;
  fs.appendFile(reducers, makeReducer(screen), (err) => {
    if (err) throw err;
  });

  //Update Main Reducer
};
