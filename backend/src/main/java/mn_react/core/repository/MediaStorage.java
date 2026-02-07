package mn_react.core.repository;

import java.io.InputStream;

public interface MediaStorage {
    /**
     * Store stream and return storage key (relative)
     */
    String store(InputStream input, String contentType, String keyHint) throws Exception;

    String getUrl(String key);

    void delete(String key) throws Exception;
}
