const DisplayCard = ({
    allPosts,
    userChoice,
    isAuth,
    auth,
    handleRemovePost,
}) => {
    if (userChoice === "") {
        return allPosts.map((post) => {
            return (
                <div className="characterCard" key={post.key}>
                    <li className="postItem">
                        <h2 className="characterName">{post.characterName}</h2>
                        <h3 className="characterClass">
                            {post.characterClass}
                        </h3>
                        <p className="characterBackstory">
                            {post.characterBackstory}
                        </p>
                        <h3 className="characterAuthor">
                            @{post.author ? post.author : "anonymous"}
                        </h3>
                        {/* if current user id matches the id or the authorId OR the user is anon, they can use delete function */}
                        {((isAuth && post.authorId === auth.currentUser.uid) ||
                            auth.currentUser.displayName === null) && (
                            <button
                                className="deleteButton"
                                onClick={() => {
                                    handleRemovePost(post.key);
                                }}
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        )}
                    </li>
                </div>
            );
        });
    } else {
        const filteredPosts = allPosts.filter((post) => {
            return post.characterClass === userChoice;
        });
        return filteredPosts.map((post) => {
            return (
                <div className="characterCard" key={post.key}>
                    <li className="postItem">
                        <h2 className="characterName">{post.characterName}</h2>
                        <h3 className="characterClass">
                            {post.characterClass}
                        </h3>
                        <p className="characterBackstory">
                            {post.characterBackstory}
                        </p>
                        <h3 className="characterAuthor">
                            @{post.author ? post.author : "anonymous"}
                        </h3>
                        {/* if current user id matches the id or the authorId OR the user is anon, they can use delete function */}
                        {((isAuth && post.authorId === auth.currentUser.uid) ||
                            auth.currentUser.displayName === null) && (
                            <button
                                className="deleteButton"
                                onClick={() => {
                                    handleRemovePost(post.key);
                                }}
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        )}
                    </li>
                </div>
            );
        });
    }
};

export default DisplayCard;
