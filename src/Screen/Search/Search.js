import React from "react";
import "./Search.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChatState } from "./../../Context/ChatProvider";

const Search = () => {
  const [use, setUse] = useState("");
  const [q, setQ] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const histry = useNavigate();
  const {
    setSelectedChat,
    user,
    setUser,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();
  useEffect(() => {
    fetch(`/api/users/userlist`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUse(result);
      }, []);
  });

  const accessChat = async (userId) => {
    try {
      // console.log(userId);
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      // console.log(user);
      const { data } = await axios.post("/api/chat", { userId }, config);

      if (chats?.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      histry("/chat");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div
      style={{
        position: "relative",
        top: "100px",
      }}
    >
      <div className="search">
        <form>
          <input
            type="text"
            placeholder=" Search People"
            name="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          ></input>
          <button type="submit">Search</button>
        </form>
      </div>

      {Object.values(use)
        ?.filter((filterName) =>
          filterName.name.toLowerCase().includes(q.toLowerCase())
        )
        .map((users, index) => (
          <div user={user} onClick={() => accessChat(users._id)}>
            {/* onClick={() => getId(users._id)} */}
            {/* <Link
              to={"/showprofile/search/" + users._id}
              key={users._Id}
              style={{
                textDecoration: "none",
                top: "15px",
                position: "relative",
                color: "black",
                fontFamily: " Helvetica",
                marginLeft: "5px",
              }}
            ></Link> */}
            {users.name}
          </div>
        ))}
    </div>
  );
};

export default Search;
