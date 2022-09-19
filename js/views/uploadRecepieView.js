import View from "./view";

class UploadRecepieView extends View {
  _parentEl = document.querySelector(".overlay");
  _addRecepie = document.querySelector(".features__btn-add-recepie");
  _uploadForm = document.querySelector(".upload-form");

  constructor() {
    super();
    this._closeModalHandler();
    this._openModalHandler();
  }
  _renderOverlay() {
    this._parentEl.classList.add("overlay--active");
  }
  _closeOverlay(e) {
    const btnClose = e.target.closest(".btn-close-modal-upload");
    if (!btnClose) return;
    this._parentEl.classList.remove("overlay--active");
  }
  _openModalHandler() {
    this._addRecepie.addEventListener("click", this._renderOverlay.bind(this));
  }
  _closeModalHandler() {
    this._parentEl.addEventListener("click", this._closeOverlay.bind(this));
  }

  //function to handle the click of upload button
  uploadHandler(handler) {
    this._uploadForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = [...new FormData(this)];
      handler(formData);
    });
  }
}

export default new UploadRecepieView();
