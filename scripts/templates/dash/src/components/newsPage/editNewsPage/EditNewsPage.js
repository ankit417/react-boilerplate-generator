import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import { useAuth, useNavigation } from "react-auth-navigation";
import { useForm } from "react-hook-form";
import { AiFillCloseCircle } from "react-icons/ai";

// MATERIAL
import { Button } from "@material-ui/core";

// DRAFT
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";

// ACTIONS
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { editNewsAction, getNewsDetailAction } from "../../../actions/Actions";

// HOCS
import CompWrapper from "../../hocs/CompWrapper.hoc";
import ActivityIndicator from "../../hocs/ActivityIndicator.hoc";

// COMMON
import {
  InputField,
  TextAreaField,
} from "../../common/inputField/InputField.common";
import DotPulse from "../../common/dotPulse/DotPulse.common";

// HELPERS
import { validator, isValid } from "../../../utils/Validator.util";

//CONFIG
import { FILE_URL } from "../../../config/Config";

const EditNewsPage = (props) => {
  const { navigation, params } = useNavigation();
  const { toast } = useAuth();
  const { navigate, routes } = navigation;
  const { editNewsAction, getNewsDetailAction, news } = props;
  const { editLoader, detail } = news;
  const { handleSubmit, register } = useForm();

  const [engEditorState, setEngEditorState] = useState();
  const [nepEditorState, setNepEditorState] = useState();

  const [image, setImage] = useState([]);
  const [imageError, setImageError] = useState(false);

  const [defaultImage, setDetfaultImage] = useState([]);
  const [deletedImage, setDeletedImage] = useState([]);

  useEffect(() => {
    getNewsDetailAction(Number(params.id));
  }, [getNewsDetailAction, params.id]);

  useEffect(() => {
    if (!!detail) {
      const blocksFromHtmlEng = htmlToDraft(detail.description.desc.en);
      const blocksFromHtmlNep = htmlToDraft(detail.description.desc.np);

      const { contentBlocks, entityMap } = blocksFromHtmlEng;
      const {
        contentBlocks: contentBlocksNep,
        entityMap: entityMapNep,
      } = blocksFromHtmlNep;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap,
      );
      const contentStateNep = ContentState.createFromBlockArray(
        contentBlocksNep,
        entityMapNep,
      );
      setEngEditorState(EditorState.createWithContent(contentState));
      setNepEditorState(EditorState.createWithContent(contentStateNep));

      setDetfaultImage(detail.images);
    }
  }, [detail]);

  const onChange = (imageList) => {
    setImageError(false);
    setImage(imageList);
  };

  const onEngChangeText = (editorState) => {
    setEngEditorState(editorState);
  };
  const onNepChangeText = (editorState) => {
    setNepEditorState(editorState);
  };

  const onSubmit = (data) => {
    const catchedErros = {};
    const validate = validator(catchedErros);

    const descEng = `${draftToHtml(
      convertToRaw(engEditorState.getCurrentContent()),
    )}`;
    const descNep = `${draftToHtml(
      convertToRaw(nepEditorState.getCurrentContent()),
    )}`;

    // VALIDATION
    validate(
      "imageFile",
      image?.length === 0 && deletedImage.length === defaultImage.length,
      () => {
        toast({ message: "Image is Required", type: "error" });
      },
    );
    validate("descEng", descEng === `<p></p>\n`, () => {
      toast({ message: "English description empty", type: "error" });
    });
    validate("descNep", descNep === `<p></p>\n`, () => {
      toast({ message: "Nepali description empty", type: "error" });
    });

    if (!isValid(catchedErros)) {
      console.error(catchedErros);
      return;
    }

    const description = {
      title: {
        en: data.titleEng,
        np: data.titleNep,
      },
      desc: {
        en: descEng,
        np: descNep,
      },
      shortDesc: {
        en: data.shortDescriptionEng,
        np: data.shortDescriptionNep,
      },
      date: {
        en: "Apr 25, 2019",
        np: "Apr 25, 2019",
      },
    };

    const body = {
      title: data.titleEng,
      description: JSON.stringify(description),
      type: "news",
    };

    const photoFormdata = new FormData();

    photoFormdata.append("type", "news");
    deletedImage.length > 0 &&
      photoFormdata.append("removeIndex", JSON.stringify(deletedImage));
    image.length > 0 &&
      image.forEach((element) => {
        photoFormdata.append("imageFile", element.file);
      });

    editNewsAction(
      Number(params.id),
      body,
      photoFormdata,
      goBackHandler,
      toast,
    );
  };

  const goBackHandler = () => {
    navigate(routes.News.path);
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
        <DotPulse />
      ) : (
        <div className="addnews-container">
          <div className="addnews">
            <form className="addnews-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="addnews-form-input">
                <div className="addnews-form-input-label">Title</div>

                <InputField
                  name="titleEng"
                  placeholder="Title"
                  innerRef={register({ required: true })}
                  defaultValue={detail?.description?.title?.en}
                />
              </div>

              <div className="addnews-form-input">
                <div className="addnews-form-input-label">
                  Short Description
                </div>

                <TextAreaField
                  name="shortDescriptionEng"
                  placeholder="Short Description ..."
                  innerRef={register({ required: true })}
                  defaultValue={detail?.description?.shortDesc?.en}
                />
              </div>

              <div className="addnews-form-input">
                <div className="addnews-form-input-label">Description</div>
                <Editor
                  name="descriptionEng"
                  editorState={engEditorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={onEngChangeText}
                />
              </div>

              <div className="addnews-form-input">
                <div className="addnews-form-input-label">शीर्षक</div>

                <InputField
                  name="titleNep"
                  innerRef={register({ required: true })}
                  defaultValue={detail?.description?.title?.np}
                />
              </div>

              <div className="addnews-form-input">
                <div className="addnews-form-input-label">छोटो वर्णन</div>

                <TextAreaField
                  name="shortDescriptionNep"
                  innerRef={register({ required: true })}
                  defaultValue={detail?.description?.shortDesc?.np}
                />
              </div>

              <div className="addnews-form-input">
                <div className="addnews-form-input-label">वर्णन</div>
                <Editor
                  name="descriptionNep"
                  editorState={nepEditorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={onNepChangeText}
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
    news: state.news,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      editNewsAction,
      getNewsDetailAction,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditNewsPage);
