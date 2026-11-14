
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import './ImageUploader1.css';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ImageUploader = ({ setFile }) => {
    const [currentFile, setCurrentFile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        setFile(currentFile);
    }, [currentFile, setFile]);

    const selectFile = (event) => {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) return;

        setError('');

        if (!selectedFile.type.startsWith('image/')) {
            setError('Selecione um arquivo de imagem válido.');
            event.target.value = '';
            return;
        }

        if (selectedFile.size > MAX_FILE_SIZE) {
            setError('A imagem deve ter no máximo 5 MB.');
            event.target.value = '';
            return;
        }

        setCurrentFile(selectedFile);
    };

    const deleteFile = () => {
        setCurrentFile(null);
        setError('');

        const input = document.getElementById('uploadImage');
        if (input) input.value = '';
    };

    return (
        <div className="img-card">

            <div className="image-uploader-header">
                <div className="image-uploader-heading">
                    <i className="bi bi-cloud-arrow-up-fill"></i>

                    <div>
                        <h6>Imagem do perfil</h6>
                        <p>Selecione uma imagem do seu dispositivo.</p>
                    </div>
                </div>

                <span className="image-uploader-format">
                    Máx. 5 MB
                </span>
            </div>

            <div className="image-uploader-controls">

                <input
                    type="file"
                    name="file"
                    id="uploadImage"
                    accept="image/*"
                    className="image-uploader-input"
                    onChange={selectFile}
                />

                <label
                    htmlFor="uploadImage"
                    className="image-uploader-select-label"
                >
                    <Button
                        variant="contained"
                        component="span"
                        className="image-uploader-select"
                        startIcon={<i className="bi bi-image"></i>}
                    >
                        {currentFile ? 'Trocar imagem' : 'Escolher imagem'}
                    </Button>
                </label>

                {currentFile ? (
                    <div className="image-uploader-file">
                        <i className="bi bi-file-earmark-image"></i>

                        <span title={currentFile.name}>
                            {currentFile.name}
                        </span>

                        <button
                            type="button"
                            className="image-uploader-delete"
                            onClick={deleteFile}
                            aria-label="Remover imagem selecionada"
                            title="Remover imagem"
                        >
                            <i className="bi bi-trash3"></i>
                        </button>
                    </div>
                ) : (
                    <span className="image-uploader-empty">
                        Nenhum arquivo escolhido
                    </span>
                )}

            </div>

            {error && (
                <div className="image-uploader-error" role="alert">
                    <i className="bi bi-exclamation-circle-fill"></i>
                    {error}
                </div>
            )}

        </div>
    );
};

export default ImageUploader;
