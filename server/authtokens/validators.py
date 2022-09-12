class RequestValidator:
    @staticmethod
    def FieldsIsNotEmpty(object, fields) -> bool:
        for field in fields:
            if not object[field]:
                return False

        return True

    @staticmethod
    def Contain(object, fields) -> bool:
        for field in fields:
            if field not in object:
                return False

        return True

    @staticmethod
    def ContainNotEmpty(object, fields) -> bool:
        return (
            RequestValidator.Contain(object=object, fields=fields) and
            RequestValidator.FieldsIsNotEmpty(object=object, fields=fields)
        )
