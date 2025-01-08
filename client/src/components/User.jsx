import React, { useEffect, useState } from "react";
import { fetchUser } from "../API/index.js"; // Importing the fetchUser function

const GetUser = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
    if (token) {
      fetchLoggedInUser(token);
    } else {
      setErrorMessage("No authentication token found. Please log in.");
    }
  }, []);

  const fetchLoggedInUser = async (token) => {
    setErrorMessage("");
    setUserInfo(null);

    try {
      const response = await fetchUser(token);
      if (response !== undefined) {
        setUserInfo(response);
      } else {
        setErrorMessage(response?.message || "Unable to fetch user information.");
      }
    } catch (error) {
      console.error("Error Fetching User Info:", error);
      setErrorMessage("An error occurred while fetching user information.");
    }
  };

  return (
    <div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {userInfo ? (
        <div id="userContainer">
          <div id="userPicAndDetailsContainer">
            <div id="profileBorder">
              <div id="userProfilePicContainer">
                <img src={userInfo?.profileUrl} alt="" />
              </div>
            </div>
            <div id="userDetailsContainer">
              <h3 className="header">User Details</h3>
              <p><strong>Name:</strong> {userInfo.name}</p>
              <p><strong>Email:</strong> {userInfo.email}</p>
              <p><strong>Title:</strong> {userInfo.userTitle || "Not provided"}</p>
              <p><strong>Bio:</strong> {userInfo.bio || "Not provided"}
              </p>
              <p><strong>Admin:</strong> {userInfo.isAdmin ? "Yes" : "No"}</p>
            </div>
          </div>
          <h3 className="header">Your Recipes</h3>
          <div className="cardsContainer">
                {
                    userInfo.recipes.map((recipe)=>{
                        return (
                            <div key={recipe.recipeId} className="bookCard">
                                <div className="userRecipeImgContainer">
                                  <img src={recipe.recipeUrl} alt="" />
                                </div> 
                                <h4>{recipe.title}</h4>
                            </div>
                        )
                    })
                }
            </div>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default GetUser;
