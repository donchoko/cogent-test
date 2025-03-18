export async function getGoogleMapsKey(): Promise<string> {
    return process.env.GOOGLE_MAPS_API_KEY as string;
}
