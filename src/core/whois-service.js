import axios from "axios"
import { parseDomainNameFromUrl } from "./parse-domainname";

export const makeWhoisServiceRequest = async (domain) => {
 
    domain = parseDomainNameFromUrl(domain)
    var apiUrl = "https://www.whoisxmlapi.com/whoisserver/WhoisService";
    var apiQueryString =
        "?apiKey=at_a0Dw1sB6Fpda0f1XcSRqliQ4RFGwo&domainName=" +
        domain +
        "&outputFormat=JSON&da=1";
    const result = await axios.get(apiUrl + apiQueryString)

    if (result.data.WhoisRecord.domainAvailability !== "AVAILABLE")
        return false;

    return true;

};
