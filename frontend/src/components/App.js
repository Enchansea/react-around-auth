import React, { useEffect, useState } from 'react';
import api from '../utils/Api';
import '../pages/index.css';
import Header from './Header';
import Main from './Main.js';
import Footer from './Footer';
//import DeletePopup from './DeletePopup';
import AddCardPopup from './AddCardPopup';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';



function App() {
  const [cards, setCards] = useState([]);

  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);
  const [selectedCard, setSelectedImageOpen] = useState(false);
  const [selectedCardTitle, setSelectedCardTitle] = useState("");
  const [selectedCardLink, setSelectedCardLink] = useState("");
  //const [isDeleteOpen, setDeletePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => console.log(err));

    api.getCardList()
      .then(res => {
        setCards(res.map((card) => ({
          link: card.link,
          name: card.name,
          likes: card.likes,
          owner: card.owner,
          _id: card._id
        })))

      })
      .catch(err => console.log(err));


  }, [])

  function handleAvatarClick() {
    setIsEditAvatarOpen(true);
  }
  function handleProfileClick() {
    setIsEditProfileOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlaceOpen(true);
  }
  function handleCardClick(link, title) {
    setSelectedCardLink(link);
    setSelectedCardTitle(title);
    setSelectedImageOpen(true);
  }

  // function handleDeleteClick() {
  //   setDeletePopupOpen(true);
  // }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        const cardCopy = cards.filter((c) => c._id !== card._id);
        setCards(cardCopy)
      })
      .catch(err => console.log(err));
  }

  function handleAddPlace(name, link) {
    api.addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards])
      })
      .then(() => setIsAddPlaceOpen(false))
      .catch(err => console.log(err));
  }

  function handleUpdateUser(name, about) {
    api.setUserInfo({ name, about })
      .then(() => {
        setCurrentUser({
          name,
          about,
          avatar: currentUser.avatar
        })
      })
      .then(() => setIsEditProfileOpen(false))
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api.setUserAvatar({ avatar })
      .then(() => {
        setCurrentUser({
          name: currentUser.name,
          about: currentUser.about,
          avatar
        })
      })
      .then(() => setIsEditAvatarOpen(false))
      .catch(err => console.log(err));
  }

  function closeAllPopups(evt) {
    if (evt.target !== evt.currentTarget) return
    setIsEditAvatarOpen(false);
    setIsEditProfileOpen(false);
    setIsAddPlaceOpen(false);
    setSelectedImageOpen(false);
    //setDeletePopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header />
          <Main
            //passed into Main.js
            cards={cards}
            onEditAvatar={handleAvatarClick}
            onEditProfile={handleProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={(data) => { handleCardClick(data) }}
            handleCardClick={handleCardClick}
            //onDeleteClick={(data) => { handleDeleteClick(data) }}
            //handleDeleteClick={handleDeleteClick}
            onCardDelete={(card) => { handleCardDelete(card) }}
            handleCardDelete={handleCardDelete}
            onCardLike={(card) => { handleCardLike(card) }}
            handleCardLike={handleCardLike}
            onClose={closeAllPopups}
          />
          <Footer />

          {/*Add avatar img popup*/}
          <EditAvatarPopup
            isOpen={isEditAvatarOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          {/*Edit profile name and about popup*/}
          <EditProfilePopup
            isOpen={isEditProfileOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />

          {/*Add-card popup with card name and url */}
          <AddCardPopup
            isOpen={isAddPlaceOpen}
            onClose={closeAllPopups}
            onUpdateAddCard={handleAddPlace} />

          {/*Delete popup*/}

          {/* <DeletePopup
            isOpen={isDeleteOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
          /> */}

          {/*Image popup*/}
          <ImagePopup isOpen={selectedCard} onClose={closeAllPopups} title={selectedCardTitle} link={selectedCardLink} />

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
