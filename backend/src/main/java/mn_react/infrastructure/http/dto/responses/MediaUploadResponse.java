package mn_react.infrastructure.http.dto.responses;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public class MediaUploadResponse {
    private String key;
    private String url;
    private String type;
    private long size;
    private Integer width;
    private Integer height;

    public String getKey() { return key; }
    public void setKey(String key) { this.key = key; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public long getSize() { return size; }
    public void setSize(long size) { this.size = size; }

    public Integer getWidth() { return width; }
    public void setWidth(Integer width) { this.width = width; }

    public Integer getHeight() { return height; }
    public void setHeight(Integer height) { this.height = height; }
}
