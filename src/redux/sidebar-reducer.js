let initialState = {
    sidebarFriendsData : [
        {id: 1, name: 'Andrew', imageLink: 'https://www.purinaone.ru/dog/sites/default/files/2021-11/shutterstock_1155759124_OG_1.jpg'},
        {id: 2, name: 'Bogdan', imageLink: 'https://cdn.profile.ru/wp-content/uploads/2021/05/grustnyi-buldog.jpg'},
        {id: 3, name: 'Igor', imageLink: 'https://cdnimg.rg.ru/i/photogallery/2019/12/06/8085b70e8b6927e/8085b70e8b6927e1575618884.jpg'},
    ],
}

const sidebarReducer = (state = initialState, action) => {
    return state;
}

export default sidebarReducer;