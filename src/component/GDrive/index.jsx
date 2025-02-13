import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';

const GDrive = () => {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const updateSigninStatus = (isSignedIn) => {
        if (isSignedIn) {
        gapi.client.drive.files.list({
            q: "mimeType='application/pdf'",
        }).then(response => {
            setFiles(response.result.files);
        });
        } else {
        gapi.auth2.getAuthInstance().signIn();
        }
    };

    useEffect(() => {
        function start() {
        gapi.client.init({
            apiKey: 'AIzaSyA9Vrs2QzrIuemwqIfYpheiIsMPtgSqcE4',
            clientId: '202413920451-7g41o3lfnbssaei19bkhvn2tnn4k0gb3.apps.googleusercontent.com',
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
            scope: 'https://www.googleapis.com/auth/drive.readonly',
        }).then(() => {
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
        }

        gapi.load('client:auth2', start);
    }, []);

    const handleViewFile = (file) => {
        setSelectedFile(`https://drive.google.com/file/d/${file.id}/preview`);
    };

    return (
        <div style={ {width:"100%"}}>
            <h1>Archivos en Google Drive</h1>
            <button onClick={() => gapi.auth2.getAuthInstance().signOut()}>Desconectar</button>
            <table>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Acción</th>
                </tr>
                </thead>
                <tbody>
                {files.map(file => (
                    <tr key={file.id}>
                    <td>{file.name}</td>
                    <td><button onClick={() => handleViewFile(file)}>Ver</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            
                {
                    selectedFile
                    ?<div style={{ marginTop: '20px' }}>
                        <h2>Visor de PDF</h2>
                        <iframe src={selectedFile} width="100%" height="500px" title="Visor de PDF"></iframe>
                    </div>
                    :<></>
                }
                
            
        </div>
    );
    };

export default GDrive;


