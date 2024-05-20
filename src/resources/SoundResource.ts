      this.sound.onerror = () => reject(
        new ResourceError(`Couldn't load the resource with path "${this.path}".`)
      );
