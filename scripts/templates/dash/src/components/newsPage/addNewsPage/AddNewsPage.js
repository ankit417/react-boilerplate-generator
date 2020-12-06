import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { useAuth, useNavigation } from "react-auth-navigation";
import { useForm } from "react-hook-form";
import { AiFillCloseCircle } from "react-icons/ai";

// MATERIAL
import { Button } from "@material-ui/core";

// DRAFT
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// ACTIONS
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { postNewsAction } from "../../../actions/Actions";

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

const AddNewsPage = (props) => {
  const { navigation } = useNavigation();
  const { toast } = useAuth();
  const { navigate, routes } = navigation;
  const { postNewsAction, news } = props;
  const { addLoader } = news;
  const { handleSubmit, register } = useForm();
  const [engEditorState, setEngEditorState] = useState(
    EditorState.createEmpty(),
  );
  const [nepEditorState, setNepEditorState] = useState(
    EditorState.createEmpty(),
  );

  const [image, setImage] = useState([]);
  const [imageError, setImageError] = useState(false);

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
    validate("imageFile", image?.length === 0, () => {
      toast({ message: "Image is Required", type: "error" });
    });
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

    const formdata = new FormData();

    formdata.append("title", data.titleEng);
    formdata.append("description", JSON.stringify(description));
    formdata.append("type", "news");
    image.length > 0 &&
      image.forEach((element) => {
        formdata.append("imageFile", element.file);
      });

    postNewsAction(formdata, goBackHandler, toast);
  };

  const goBackHandler = () => {
    navigate(routes.News.path);
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

            <div className="addnews-form-input">
              <div className="addnews-form-input-label">Short Description</div>

              <TextAreaField
                name="shortDescriptionEng"
                placeholder="Short Description ..."
                innerRef={register({ required: true })}
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
              />
            </div>

            <div className="addnews-form-input">
              <div className="addnews-form-input-label">छोटो वर्णन</div>

              <TextAreaField
                name="shortDescriptionNep"
                innerRef={register({ required: true })}
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
    news: state.news,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      postNewsAction,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewsPage);
