'use strict';

var COUNT_OF_PICTURES = 25;

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var FIRST_NAMES = [
  'Иван',
  'Хуан',
  'Хуанита',
  'Мария',
  'Кристоф',
  'Кристовина',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var chooseRandomFromTheRange = function (value1, value2) {
  return Math.floor(Math.random() * (value2 - value1 + 1) + value1);
};

var chooseRandomArrayValue = function (value1) {
  return value1[Math.floor(Math.random() * value1.length)];
};

var createComment = function () {
  var message;
  if (chooseRandomFromTheRange(1, 2) === 1) {
    message = chooseRandomArrayValue(COMMENTS);
  } else {
    message = chooseRandomArrayValue(COMMENTS) + ' ' + chooseRandomArrayValue(COMMENTS);
  }

  var commentObject = {
    avatar: 'img/avatar-' + chooseRandomFromTheRange(1, 6) + '.svg',
    message: message,
    name: chooseRandomArrayValue(FIRST_NAMES)
  };
  return commentObject;
};

var generateArrayOfPictures = function () {
  var arrayOfPictures = [];

  for (var i = 0; i < COUNT_OF_PICTURES; i++) {
    var countOfComments = chooseRandomFromTheRange(2, 5);
    var comments = [];

    for (var j = 0; j < countOfComments; j++) {
      comments[j] = createComment();
    }

    var pictureObject = {
      url: 'photos/' + [i + 1] + '.jpg',
      description: 'Описание фотографии',
      countOfLikes: chooseRandomFromTheRange(15, 200),
      countOfComments: countOfComments,
      comments: comments
    };
    arrayOfPictures[i] = pictureObject;
  }
  return arrayOfPictures;
};

var generateNodeOfPicture = function (substitutionalObject) {
  var element = pictureTemplate.cloneNode(true);

  element.querySelector('.picture__img').src = substitutionalObject.url;
  element.querySelector('.picture__likes').textContent = substitutionalObject.countOfLikes;
  element.querySelector('.picture__comments').textContent = substitutionalObject.countOfComments;
  return element;
};

var addPicturesInFragment = function (substitutionalObjects) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < substitutionalObjects.length; i++) {
    fragment.appendChild(generateNodeOfPicture(substitutionalObjects[i]));
  }
  return fragment;
};

var drawPictures = function (pictures) {
  containerForPictures.appendChild(pictures);
};

var generateNodeOfComments = function (substitutionalObject) {
  var element = commentTemplate.cloneNode(true);

  element.querySelector('.social__picture').src = substitutionalObject.avatar;
  element.querySelector('.social__text').textContent = substitutionalObject.message;
  return element;
};

var addBigPictureInFragment = function (substitutionalObject) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < substitutionalObject.length; i++) {
    fragment.appendChild(generateNodeOfComments(substitutionalObject[i]));
  }
  return fragment;
};

var addBigPicture = function (picture) {
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.querySelector('.likes-count').textContent = picture.countOfLikes;
  bigPicture.querySelector('.comments-count').textContent = picture.countOfComments;

  comentsContainer.appendChild(addBigPictureInFragment(picture.comments));
};


var arrayOfPictures = generateArrayOfPictures();

var pictureTemplate = document.querySelector('#picture').content;
var containerForPictures = document.querySelector('.pictures');

drawPictures(addPicturesInFragment(arrayOfPictures));

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

var commentTemplate = document.querySelector('#comment').content;
var comentsContainer = document.querySelector('.social__comments');

addBigPicture(arrayOfPictures[0]);

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');
