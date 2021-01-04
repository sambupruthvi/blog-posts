import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';


// when fetchPosts is called it returns a function redux thunk automatically invokes the dispatch function. The outer dispatch function waits till the api request is complete and then dispatches the result.
export const fetchPostsAndUsers = () => {
    return async (dispatch, getState) => {
        await dispatch(fetchPosts());
        // const userIds = _.uniq(_.map(getState().posts, 'userId'));
        // userIds.forEach(id => dispatch(fetchUser(id)));
        _.chain(getState().posts)
         .map('userId') // automatically passes the above argument as first arguments to the chained functions. == map(getState().posts, 'userId')
         .uniq()
         .forEach(id => dispatch(fetchUser(id)))
         .value() // its like execute() the chain function
    }
}

export const fetchPosts = () => {
    return async (dispatch) => {
        const response = await jsonPlaceholder.get('/posts');
        dispatch({
            type : 'FETCH_POSTS',
            payload: response.data
        });
    }
};

export const fetchUser = (id) => {
    return async (dispatch) => {
        const response = await jsonPlaceholder.get(`/users/${id}`);
        dispatch({
            type: 'FETCH_USER',
            payload: response.data
        })
    }
}

// export const fetchUser = (id) => {
//     return (dispatch) => {
//         _fetchUser(id, dispatch);
//     }
// }

// // private function
// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);
//     dispatch({
//         type: 'FETCH_USER',
//         payload: response.data
//     })
// })