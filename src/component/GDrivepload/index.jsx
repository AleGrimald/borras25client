import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import './GDriveUpload.css';

const GDriveUpload = () => {
    const [fileToUpload, setFileToUpload] = useState(null);

    const updateSigninStatus = (isSignedIn) => {
        if (isSignedIn) {
            console.log('User is signed in');
        } else {
            gapi.auth2.getAuthInstance().signIn();
        }
    };

    useEffect(() => {
        function start() {
            gapi.client.init({
                apiKey: 'AIzaSyA9Vrs2QzrIuemwqIfYpheiIsMPtgSqcE4',
                clientId: '202413920451-5p4c1h28vgq75554qnppflmh3kspsarr.apps.googleusercontent.com',
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
                scope: 'https://www.googleapis.com/auth/drive.file',
            }).then(() => {
                gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
                if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
                    gapi.auth2.getAuthInstance().signIn();
                }
            }).catch(error => {
                console.error('Error initializing GAPI client:', error);
                alert('Error inicializando el cliente GAPI. Revisa la consola para más detalles.');
            });
        }

        gapi.load('client:auth2', start);
    }, []);

    const handleFileChange = (event) => {
        setFileToUpload(event.target.files[0]);
    };

    const updateFilePermissions = (fileId) => {
        return gapi.client.drive.permissions.create({
            fileId: fileId,
            resource: {
                role: 'reader',
                type: 'anyone',
            },
        }).then(() => {
            console.log('Permisos actualizados para el archivo:', fileId);
        }).catch((error) => {
            console.error('Error updating file permissions:', error);
            alert('Error actualizando los permisos del archivo. Por favor, revisa la consola para más detalles.');
        });
    };

    const handleUploadFile = () => {
        const boundary = '-------314159265358979323846';
        const delimiter = '\r\n--' + boundary + '\r\n';
        const close_delim = '\r\n--' + boundary + '--';

        const reader = new FileReader();
        reader.readAsBinaryString(fileToUpload);
        reader.onload = () => {
            const contentType = fileToUpload.type || 'application/octet-stream';
            const metadata = {
                'name': fileToUpload.name,
                'mimeType': contentType,
            };

            const base64Data = btoa(reader.result);
            const multipartRequestBody =
                delimiter + 'Content-Type: application/json\r\n\r\n' +
                JSON.stringify(metadata) +
                delimiter + 'Content-Type: ' + contentType + '\r\n' +
                'Content-Transfer-Encoding: base64\r\n' +
                '\r\n' + base64Data +
                close_delim;

            gapi.client.request({
                'path': '/upload/drive/v3/files',
                'method': 'POST',
                'params': {
                    'uploadType': 'multipart',
                },
                'headers': {
                    'Content-Type': 'multipart/related; boundary="' + boundary + '"',
                },
                'body': multipartRequestBody,
            }).then((response) => {
                const fileId = response.result.id;
                updateFilePermissions(fileId).then(() => {
                    console.log('Archivo subido y permisos actualizados exitosamente!');
                    setFileToUpload(null);
                });
            }).catch((error) => {
                console.error('Error uploading file:', error);
                alert('Error subiendo el archivo. Por favor, revisa la consola para más detalles.');
            });
        };
    };

    return (
        <div className='contenedor_upload'>
            <h2 className='upload_h2'>Subir PDF a Google Drive</h2>
            <input type="file" className='input-file' onChange={handleFileChange} />
            <button onClick={handleUploadFile} className='btn-subir'>Subir PDF</button>
        </div>
    );
};

export default GDriveUpload;
