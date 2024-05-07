import { createConfiguration, ServerConfiguration, ThoughtSpotRestApi } from "@thoughtspot/rest-api-sdk";

export const convertBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
        resolve(fileReader.result);
        }
        fileReader.onerror = (error) => {
        reject(error);
        }
    })
}


export const createClientWithoutAuth = (host: string) => {
    host = host.replace("#/","").replace("#","");
    if (host.endsWith('/')) {
        host = host.slice(0, -1);
    }
    const config = createConfiguration({
      baseServer: new ServerConfiguration(host, {}),
    });
    const tsRestApiClient = new ThoughtSpotRestApi(config);
    return tsRestApiClient;
};

export function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}