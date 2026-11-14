
import React, { useState } from 'react';
import './ImageUploader.css';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ImageUploaderModal = ({ setFile, setImage, chosenImage }) => {
    const [currentFile, setCurrentFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [error, setError] = useState('');

    const selectFile = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setError('');

        if (!file.type.startsWith('image/')) {
            setError('Selecione um arquivo de imagem válido.');
            event.target.value = '';
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setError('A imagem deve ter no máximo 5 MB.');
            event.target.value = '';
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            setCurrentFile(file);
            setPreviewImage(reader.result);
        };

        reader.onerror = () => {
            setError('Não foi possível carregar essa imagem.');
        };

        reader.readAsDataURL(file);
    };

    const confirmFile = () => {
        if (!currentFile || !previewImage) return;

        setFile(currentFile);
        setImage(previewImage);
        setError('');
    };

    const deleteFile = () => {
        setCurrentFile(null);
        setPreviewImage(null);
        setError('');

        const input = document.getElementById('uploadImage');
        if (input) input.value = '';
    };

    const cancelSelection = () => {
        setError('');
    };

    return (
        <div className="image-uploader">

            <button
                type="button"
                className="image-uploader-trigger"
                data-bs-toggle="modal"
                data-bs-target="#imageModal"
            >
                <i className="bi bi-camera-fill"></i>

                <span>
                    {chosenImage ? 'Alterar imagem' : 'Escolher imagem'}
                </span>
            </button>

            <div
                className="modal fade image-uploader-modal"
                id="imageModal"
                tabIndex="-1"
                aria-labelledby="imageModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <div>
                                <span className="image-modal-eyebrow">
                                    TUFFVALLEY
                                </span>

                                <h5
                                    className="modal-title"
                                    id="imageModalLabel"
                                >
                                    Sua imagem de perfil
                                </h5>
                            </div>

                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Fechar"
                                onClick={cancelSelection}
                            />
                        </div>

                        <div className="modal-body">

                            <p className="image-modal-description">
                                Escolha uma imagem que represente você.
                                Ela será utilizada no seu perfil.
                            </p>

                            <div className="image-upload-area">

                                {previewImage ? (
                                    <div className="image-preview-container">
                                        <img
                                            src={previewImage}
                                            alt="Prévia da imagem selecionada"
                                            className="image-preview"
                                        />

                                        <span className="image-preview-badge">
                                            <i className="bi bi-check-circle-fill"></i>
                                            Prévia
                                        </span>
                                    </div>
                                ) : (
                                    <div className="image-upload-placeholder">
                                        <div className="image-upload-icon">
                                            <i className="bi bi-image"></i>
                                        </div>

                                        <h6>Nenhuma imagem selecionada</h6>

                                        <p>
                                            Escolha uma imagem do seu dispositivo
                                            para visualizar a prévia.
                                        </p>
                                    </div>
                                )}

                                <input
                                    type="file"
                                    name="file"
                                    id="uploadImage"
                                    accept="image/*"
                                    className="image-upload-input"
                                    onChange={selectFile}
                                />

                                <label
                                    htmlFor="uploadImage"
                                    className="image-upload-select"
                                >
                                    <i className="bi bi-folder2-open"></i>
                                    {previewImage
                                        ? 'Escolher outra imagem'
                                        : 'Selecionar arquivo'}
                                </label>

                                {currentFile && (
                                    <div className="image-file-info">
                                        <i className="bi bi-file-earmark-image"></i>

                                        <span title={currentFile.name}>
                                            {currentFile.name}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={deleteFile}
                                            aria-label="Remover imagem selecionada"
                                            title="Remover seleção"
                                        >
                                            <i className="bi bi-trash3"></i>
                                        </button>
                                    </div>
                                )}

                                {error && (
                                    <div className="image-upload-error" role="alert">
                                        <i className="bi bi-exclamation-circle-fill"></i>
                                        {error}
                                    </div>
                                )}
                            </div>

                            <div className="image-upload-hint">
                                <i className="bi bi-info-circle"></i>
                                Formatos de imagem aceitos. Tamanho máximo: 5 MB.
                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="image-modal-cancel"
                                data-bs-dismiss="modal"
                                onClick={cancelSelection}
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                className="image-modal-confirm"
                                onClick={confirmFile}
                                data-bs-dismiss="modal"
                                disabled={!currentFile || !previewImage}
                            >
                                <i className="bi bi-check2"></i>
                                Confirmar imagem
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            {chosenImage && (
                <div className="image-uploader-current">
                    <span className="image-current-label">
                        IMAGEM ATUAL
                    </span>

                    <img
                        src={chosenImage}
                        alt="Imagem de perfil atual"
                        className="image-current-preview"
                    />
                </div>
            )}

        </div>
    );
};

export default ImageUploaderModal;
