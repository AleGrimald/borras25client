/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import './GDriveViewFolder.css'
import { gapi } from 'gapi-script';
import { useState, useEffect } from 'react';

const GDriveViewFolder = () => {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState();
    const [currentFolder, setCurrentFolder] = useState('root');
    const [folderStack, setFolderStack] = useState([]);
    const [fileToUpload, setFileToUpload] = useState(null);
    const [visibilidadArchivo, setAlternarVisibildiadArchivo] = useState(false);

    const listFilesAndFolders = (folderId = 'root') => {
        gapi.client.drive.files.list({
            q: `'${folderId}' in parents and (mimeType='application/vnd.google-apps.folder' or mimeType='application/pdf')`,
            fields: 'files(id, name, mimeType, parents)',
        }).then(response => {
            const sortedFiles = (response.result.files || []).sort((a, b) => a.name.localeCompare(b.name)); // Ordenar alfabéticamente
            setFiles(sortedFiles);
        }).catch(error => {
            console.error('Error fetching files: ', error);
            setFiles([]);
        });
    };

    const updateSigninStatus = (isSignedIn) => {
        if (isSignedIn) {
            listFilesAndFolders();
        } else {
            gapi.auth2.getAuthInstance().signIn();
        }
    };

    useEffect(() => {
        function start() {
            gapi.client.init({
                apiKey: 'AIzaSyBKWKtuKgRAbLbDvTwgo4T4yNMECqFUa_4',
                clientId: '202413920451-5p4c1h28vgq75554qnppflmh3kspsarr.apps.googleusercontent.com',
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
                scope: 'https://www.googleapis.com/auth/drive',
            }).then(() => {
                gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
                updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            }).catch(error => {
                console.error('Error initializing gapi client: ', error);
            });
        }

        gapi.load('client:auth2', start);
    }, []);

    const manejoClickCarpeta = (folderId) => {
        setFolderStack([...folderStack, currentFolder]);
        setCurrentFolder(folderId);
        listFilesAndFolders(folderId);
    };

    const manejoRetroceder = () => {
        const previousFolder = folderStack.pop();
        setFolderStack([...folderStack]);
        setCurrentFolder(previousFolder);
        listFilesAndFolders(previousFolder);
        setAlternarVisibildiadArchivo(false);
    };

    const handleViewFile = (file) => {
        setSelectedFile(`https://drive.google.com/file/d/${file.id}/preview`);
    };

    const handleFileChange = (event) => {
        setFileToUpload(event.target.files[0]);
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
                'parents': [currentFolder]
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
                setFileToUpload(null);
                listFilesAndFolders(currentFolder);
                alert("Archivo Subido Exitosamente!")
                const inp_file = document.querySelector("#inp_file");
                inp_file.value = null;
            }).catch((error) => {
                console.error('Error uploading file:', error);
                alert('Error subiendo el archivo. Por favor, revisa la consola para más detalles.');
            });
        };
    };

    const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ];
    const numerosMeses = [
        "01", "02", "03", "04", "05", "06", 
        "07", "08", "09", "10", "11", "12"
    ];

    return (
        <div className='contenedor_gdrive'>
            <h2 className='gdrive_h2'>Rutinas en Google Drive</h2>
            <button onClick={()=>{updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())}}>asdasdas</button>
            {
                folderStack.length > 0 && <button onClick={manejoRetroceder} className='btn-accion'>Volver</button>
            }

            <table className='tabla-archivos'>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {files.length > 0 ? files.map((file,index) => (
                        <tr key={file.id}>
                            <td>{file.name===numerosMeses[index]?file.name+' - '+meses[index]: file.name}</td>
                            <td>
                                {
                                    file.mimeType === 'application/vnd.google-apps.folder'
                                    ?<button onClick={() => manejoClickCarpeta(file.id)} className='btn-accion'>Abrir</button>
                                    :<div style={{ display:'flex', justifyContent:'space-around'}}>
                                        <button onClick={() => {handleViewFile(file); setAlternarVisibildiadArchivo(!visibilidadArchivo)}} className='btn-accion'>Ver</button>
                                        <button style={{backgroundColor:'#E04B2E'}} onClick={() => handleViewFile(file)} className='btn-accion'>Borrar</button>
                                    </div>
                                }
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="2">No se encontraron archivos o carpetas.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {
                currentFolder !== 'root' &&
                <div className='contenedor_upload'>
                    <h2 className='upload_h2'>Asigna una rutina ⬇️</h2>
                    <input id='inp_file' type="file" className='input-file' onChange={handleFileChange} />
                    <button onClick={handleUploadFile} className='btn-subir'>Subir PDF</button>
                </div>
            }
            {
                visibilidadArchivo?
                selectedFile &&
                <div className="visor-pdf">
                    <h2>Vista Previa</h2>
                    <iframe src={selectedFile} width="100%" height="500px" title="Visor de PDF" sandbox="allow-scripts allow-same-origin"></iframe>
                </div>:<></>
            }
        </div>
    );
};

export default GDriveViewFolder;
