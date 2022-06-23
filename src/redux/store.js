import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state : {
        profilePage: {
            posts : [
                {id: 1, message: 'Hi, how are you?', likesCount: 15},
                {id: 2, message: "It's my first project", likesCount: 20},
                {id: 3, message: 'BLAbla?', likesCount: 5},
                {id: 4, message: "Okkkk", likesCount: 4},
            ],
            newPostText : '',
        },
        dialogsPage: {
            dialogs : [
                {id: 1, name: 'Andrew'},
                {id: 2, name: 'Bogdan'},
                {id: 3, name: 'Igor'},
                {id: 4, name: 'Finik'},
                {id: 5, name: 'Elsa'},
                {id: 6, name: 'Pantera'},
            ],
            messages : [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How are you?'},
                {id: 3, message: 'Yo!'},
                {id: 4, message: 'Good morning'},
                {id: 5, message: 'Hello'},
                {id: 6, message: 'Brrr'},
            ],
            newMessageBody : "",
        },
        sidebarData: {
            sidebarFriendsData : [
                {id: 1, name: 'Andrew', imageLink: 'https://www.purinaone.ru/dog/sites/default/files/2021-11/shutterstock_1155759124_OG_1.jpg'},
                {id: 2, name: 'Bogdan', imageLink: 'https://cdn.profile.ru/wp-content/uploads/2021/05/grustnyi-buldog.jpg'},
                {id: 3, name: 'Igor', imageLink: 'https://cdnimg.rg.ru/i/photogallery/2019/12/06/8085b70e8b6927e/8085b70e8b6927e1575618884.jpg'},
            ],
        }
    },
    _callSubscriber() {
        console.log('State changed');
    },

    getState() {
        debugger;
        return this._state;
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebarData = sidebarReducer(this._state.sidebarData, action);

        this._callSubscriber(this._state);
    }
}


export default store;
window.store = store;