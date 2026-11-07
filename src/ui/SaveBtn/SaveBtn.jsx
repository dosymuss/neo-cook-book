import { useState } from "react";

import bookmarkAcc from "../../assets/cardImage/bookmarkAcc.svg";
import bookmarkIcon from "../../assets/cardImage/bookmark.svg";
import { postRecipeBookmark } from "../../api/recipeApi";

import styles from "./SaveBtn.module.scss";
import { toastSuccess } from "../Toast/toast";

const SaveBtn = ({ id, isBookMarked }) => {
  console.log(isBookMarked);
  const [isBookMark, setIsBookMark] = useState(isBookMarked);

  const handleClick = () => {
    setIsBookMark(!isBookMark);
    postRecipeBookmark({
      recipe: id,
      is_bookmarked: !isBookMarked,
    }).then((res) => {
      if (res.status === 200) {
        toastSuccess("Рецепт сохранен в профиле");
      }
    });
  };

  const tokenString = localStorage.getItem("token");

  return (
    <button
      disabled={!tokenString}
      onClick={() => {
        handleClick();
      }}
      className={styles.saveBtn}
    >
      <img src={isBookMark ? bookmarkAcc : bookmarkIcon} alt="" />
      <p>{isBookMark ? "Сохранено" : "Сохранить рецепт"}</p>
    </button>
  );
};

export default SaveBtn;
