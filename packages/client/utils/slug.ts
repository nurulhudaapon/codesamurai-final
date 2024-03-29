export const nameToSlug = (name: string) => {
    return name.toLowerCase().replace(" ", "_");
}