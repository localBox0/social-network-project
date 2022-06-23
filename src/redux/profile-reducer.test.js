import React from "react";
import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";

let state = {
    posts : [
        {id: 1, message: 'Hi, how are you?', likesCount: 15},
        {id: 2, message: "It's my first project", likesCount: 20},
        {id: 3, message: 'BLAbla?', likesCount: 5},
        {id: 4, message: "Okkkk", likesCount: 4},
    ]
}

test('Length of posts should be incremented', () => {
    let action = addPostActionCreator('my new test');
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(5);
});

test('Checking new message', () => {
    let action = addPostActionCreator('my new test');
    let newState = profileReducer(state, action);
    expect(newState.posts[4].message).toBe('my new test');
});

test('Checking likesCount of new message', () => {
    let action = addPostActionCreator('my new test');
    let newState = profileReducer(state, action);
    expect(newState.posts[4].likesCount).toBe(0);
});

test('Length of posts should be decremented', () => {
    let action = deletePost(1);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(3);
});