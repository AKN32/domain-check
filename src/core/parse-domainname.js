export const parseDomainNameFromUrl = async (domain) => {
    domain = domain.replace("http://", "");
    domain = domain.replace("http://", "");
    domain = domain.replace("www.", "");
    return domain;
};
