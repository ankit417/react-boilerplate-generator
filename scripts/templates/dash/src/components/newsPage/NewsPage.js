import React, { useEffect } from "react";
import { useAuth, useNavigation } from "react-auth-navigation";

// ACTIONs
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getNewsAction, deleteNewsAction } from "../../actions/Actions";

// HOCS
import CompWrapper from "../hocs/CompWrapper.hoc";

// COMMON
import { InvertedButton } from "../common/button/Button.common";
import Table from "../common/table/Table.common";

// HELPER
import { FILE_URL } from "../../config/Config";

const NewsPage = (props) => {
  const { getNewsAction, deleteNewsAction, news } = props;
  const { listLoader, listCount, list, deleteLoader } = news;
  const { location, navigation } = useNavigation();
  const { toast } = useAuth();
  const { navigate, routes } = navigation;
  let query = useQuery();

  function useQuery() {
    return new URLSearchParams(location?.search);
  }
  const pageNumber = query.get("page") || 1;

  useEffect(() => {
    getNewsAction(pageNumber);
  }, [getNewsAction, pageNumber]);

  const deleteHandler = (id) => {
    deleteNewsAction(id, toast, pageNumber);
  };

  const editHandler = (id) => {
    navigate(`news/edit/${id}`);
  };

  return (
    <CompWrapper>
      <div className="newspage-container">
        <div className="newspage">
          <div className="newspage-head">
            <div className="newspage-head-title">News</div>
            <div className="newspage-head-button">
              <div style={{ width: 100 }}>
                <InvertedButton
                  title="Add"
                  onClick={() => {
                    navigate(routes["Add News"].path);
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
    news: state.news,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getNewsAction,
      deleteNewsAction,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
