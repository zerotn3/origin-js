import contractService from './contract-service'
import ipfsService from './ipfs-service'
import Listing from './listing/listing'


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
