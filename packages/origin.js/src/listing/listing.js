class Listing {

  constructor() {

  }

  /**
   * Purchase/book the listing
   */
  purchase() {
    return Promise((resolve, reject) => {
      // buy/book the listing.
      // Unclear what this should do in base case
    }
  }

  /**
   * schema json for listing.
   * See: http://json-schema.org/
   */
  get schema () {
      return this.schemaJson;
  }
  set schema (schemaJson) {
      this.schema = schemaJson
  }

  /**
   * IPFS hash of listing metadata
   * @return {string}
   */
  get metadataHash () {
    return this.ipfsHash;
  }

  /**
   * JSON of Listing metadata
   * Retrieved from IPFS and parsed into json
   * @return {json object}
   */
  get metadata () {
    return Promise((resolve, reject) => {
      // get file from IPFS
    }
  }

  /**
   * Address of Listing on blockchain
   * Null if not published.
   * @return {hex}
   */
  get contractAddress () {
      return this.schemaJson;
  }
  set contractAddress (schemaJson) {
      this.schema = schemaJson
  }

}


