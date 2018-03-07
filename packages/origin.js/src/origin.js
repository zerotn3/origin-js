import contractService from './contract-service'
import ipfsService from './ipfs-service'

class Listing {

  /**
   * Purchase/book the listing
   */
  purchase() {

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


class ForSaleListing extends Listing{

  constructor(listingJson) {
    // validate jsonSchema
  }

}


class HomeRentalListing extends Listing{

  constructor(listingJson) {
    // validate jsonSchema
  }

}


class Origin {
  static instance

  addListing(newListing) {
    return new Promise((resolve, reject) => {
      // submit listing to ipfs

      // submit listing to chain

      // return address of listing? or update an "address" property of listing object?
    }
  }

}

const origin = new Origin()

export default origin
