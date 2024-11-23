from lxml import etree

# Load XML and XSL files
xml_file = 'web.xml'
xsl_file = 'web.xsl'

# Parse the XML and XSL files
xml = etree.parse(xml_file)
xsl = etree.parse(xsl_file)

# Create an XSLT transformer
transform = etree.XSLT(xsl)

# Transform the XML
result = transform(xml)

# Output the result (this can be saved to a file or printed)
print(str(result))
