const {expect} = require('chai');
const slug = require('../index');

describe('sluglife', () => {
  it('should convert input to string', () => {
    expect(slug(1)).to.equal('1');
    expect(slug(567890)).to.equal('567890');
  });

  it('should replace whitespaces with replacement', () => {
    expect(slug('foo bar baz')).to.equal('foo-bar-baz');
    expect(slug('foo bar baz', {'replacement': '_'})).to.equal('foo_bar_baz');
    expect(slug('foo bar baz', {'replacement': ''})).to.equal('foobarbaz');
  });

  it('should remove leading/trailing space if any', () => {
    expect(slug(' foo bar baz ')).to.equal('foo-bar-baz');
  });

  it('should remove not allowed chars', () => {
    expect(slug('foo, bar baz')).to.equal('foo-bar-baz');
    expect(slug('foo- bar baz')).to.equal('foo-bar-baz');
    expect(slug('foo] bar baz')).to.equal('foo-bar-baz');
  });

  it('should leave allowed chars in rfc3986 mode', () => {
    const allowed = ['.', '_', '~'];
    Object.keys(allowed).forEach((key) => {
      expect(slug(`foo ${key} bar baz`, {'mode': 'rfc3986'})).to.equal(`foo-${key}-bar-baz`);
    });
  });

  it('should leave allowed chars in pretty mode', () => {
    const allowed = ['.', '_', '~'];
    Object.keys(allowed).forEach((key) => {
      expect(slug(`foo ${key} bar baz`, {'mode': 'pretty'})).to.equal(`foo-${key}-bar-baz`);
    });
  });

  it('should replace latin chars', () => {
    const charMap = {
      'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE', 'Ç': 'C', 'È': 'E', 'É': 'E', 'Ê': 'E',
      'Ë': 'E', 'Ì': 'I', 'Í': 'I', 'Î': 'I', 'Ï': 'I', 'Ð': 'D', 'Ñ': 'N', 'Ò': 'O', 'Ó': 'O', 'Ô': 'O', 'Õ': 'O',
      'Ö': 'O', 'Ő': 'O', 'Ø': 'O', 'Ù': 'U', 'Ú': 'U', 'Û': 'U', 'Ü': 'U', 'Ű': 'U', 'Ý': 'Y', 'Þ': 'TH', 'ß': 'ss',
      'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae', 'ç': 'c', 'è': 'e', 'é': 'e', 'ê': 'e',
      'ë': 'e', 'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i', 'ð': 'd', 'ñ': 'n', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o',
      'ö': 'o', 'ő': 'o', 'ø': 'o', 'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ű': 'u', 'ý': 'y', 'þ': 'th', 'ÿ': 'y',
      'ẞ': 'SS',
    };

    Object.keys(charMap).forEach((key) => {
      expect(slug(`foo ${key} bar baz`)).to.equal(`foo-${charMap[key]}-bar-baz`);
    });
  });

  it('should replace greek chars', () => {
    const charMap = {
      'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'h', 'θ': '8',
      'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': '3', 'ο': 'o', 'π': 'p',
      'ρ': 'r', 'σ': 's', 'τ': 't', 'υ': 'y', 'φ': 'f', 'χ': 'x', 'ψ': 'ps', 'ω': 'w',
      'ά': 'a', 'έ': 'e', 'ί': 'i', 'ό': 'o', 'ύ': 'y', 'ή': 'h', 'ώ': 'w', 'ς': 's',
      'ϊ': 'i', 'ΰ': 'y', 'ϋ': 'y', 'ΐ': 'i',
      'Α': 'A', 'Β': 'B', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Ζ': 'Z', 'Η': 'H', 'Θ': '8',
      'Ι': 'I', 'Κ': 'K', 'Λ': 'L', 'Μ': 'M', 'Ν': 'N', 'Ξ': '3', 'Ο': 'O', 'Π': 'P',
      'Ρ': 'R', 'Σ': 'S', 'Τ': 'T', 'Υ': 'Y', 'Φ': 'F', 'Χ': 'X', 'Ψ': 'PS', 'Ω': 'W',
      'Ά': 'A', 'Έ': 'E', 'Ί': 'I', 'Ό': 'O', 'Ύ': 'Y', 'Ή': 'H', 'Ώ': 'W', 'Ϊ': 'I',
      'Ϋ': 'Y',
    };

    Object.keys(charMap).forEach((key) => {
      expect(slug(`foo ${key} bar baz`)).to.equal(`foo-${charMap[key]}-bar-baz`);
    });
  });

  it('should replace turkish chars', () => {
    const charMap = {
      'ş': 's', 'Ş': 'S', 'ı': 'i', 'İ': 'I', 'ç': 'c', 'Ç': 'C', 'ü': 'u',
      'Ü': 'U', 'ö': 'o', 'Ö': 'O', 'ğ': 'g', 'Ğ': 'G',
    };

    Object.keys(charMap).forEach((key) => {
      expect(slug(`foo ${key} bar baz`)).to.equal(`foo-${charMap[key]}-bar-baz`);
    });
  });

  it('should replace cyrillic chars', () => {
    const charMap = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
      'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
      'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c',
      'ч': 'ch', 'ш': 'sh', 'щ': 'sh', 'ъ': 'u', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
      'я': 'ya',
      'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh',
      'З': 'Z', 'И': 'I', 'Й': 'J', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O',
      'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C',
      'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sh', 'Ъ': 'U', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu',
      'Я': 'Ya', 'Є': 'Ye', 'І': 'I', 'Ї': 'Yi', 'Ґ': 'G', 'є': 'ye', 'і': 'i', 'ї': 'yi', 'ґ': 'g',
    };

    Object.keys(charMap).forEach((key) => {
      if (charMap[key]) {
        expect(slug(`foo ${key} bar baz`)).to.equal(`foo-${charMap[key]}-bar-baz`);
      } else {
        expect(slug(`foo ${key} bar baz`)).to.equal('foo-bar-baz');
      }
    });
  });

  it('should replace czech chars', () => {
    const charMap = {
      'č': 'c', 'ď': 'd', 'ě': 'e', 'ň': 'n', 'ř': 'r', 'š': 's', 'ť': 't', 'ů': 'u',
      'ž': 'z', 'Č': 'C', 'Ď': 'D', 'Ě': 'E', 'Ň': 'N', 'Ř': 'R', 'Š': 'S', 'Ť': 'T',
      'Ů': 'U', 'Ž': 'Z',
    };
    Object.keys(charMap).forEach((key) => {
      expect(slug(`foo ${key} bar baz`)).to.equal(`foo-${charMap[key]}-bar-baz`);
    });
  });

  it('should replace polish chars', () => {
    const charMap = {
      'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z',
      'ż': 'z', 'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N', 'Ś': 'S',
      'Ź': 'Z', 'Ż': 'Z',
    };
    Object.keys(charMap).forEach((key) => {
      expect(slug(`foo ${key} bar baz`)).to.equal(`foo-${charMap[key]}-bar-baz`);
    });
  });

  it('should replace latvian chars', () => {
    const charMap = {
      'ā': 'a', 'č': 'c', 'ē': 'e', 'ģ': 'g', 'ī': 'i', 'ķ': 'k', 'ļ': 'l', 'ņ': 'n',
      'š': 's', 'ū': 'u', 'ž': 'z', 'Ā': 'A', 'Č': 'C', 'Ē': 'E', 'Ģ': 'G', 'Ī': 'I',
      'Ķ': 'K', 'Ļ': 'L', 'Ņ': 'N', 'Š': 'S', 'Ū': 'U', 'Ž': 'Z',
    };
    Object.keys(charMap).forEach((key) => {
      expect(slug(`foo ${key} bar baz`)).to.equal(`foo-${charMap[key]}-bar-baz`);
    });
  });

  it('should replace vietnamese chars', () => {
    const charMap = {
      'Ạ': 'A', 'Ả': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ậ': 'A', 'Ẩ': 'A', 'Ẫ': 'A',
      'Ằ': 'A', 'Ắ': 'A', 'Ặ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ẹ': 'E', 'Ẻ': 'E',
      'Ẽ': 'E', 'Ề': 'E', 'Ế': 'E', 'Ệ': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ị': 'I',
      'Ỉ': 'I', 'Ĩ': 'I', 'Ọ': 'O', 'Ỏ': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ộ': 'O',
      'Ổ': 'O', 'Ỗ': 'O', 'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ợ': 'O', 'Ở': 'O',
      'Ỡ': 'O', 'Ụ': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U',
      'Ự': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ỳ': 'Y', 'Ỵ': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y',
      'Đ': 'D', 'ạ': 'a', 'ả': 'a', 'ầ': 'a', 'ấ': 'a', 'ậ': 'a', 'ẩ': 'a',
      'ẫ': 'a', 'ằ': 'a', 'ắ': 'a', 'ặ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ẹ': 'e',
      'ẻ': 'e', 'ẽ': 'e', 'ề': 'e', 'ế': 'e', 'ệ': 'e', 'ể': 'e', 'ễ': 'e',
      'ị': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ọ': 'o', 'ỏ': 'o', 'ồ': 'o', 'ố': 'o',
      'ộ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ợ': 'o',
      'ở': 'o', 'ỡ': 'o', 'ụ': 'u', 'ủ': 'u', 'ũ': 'u', 'ư': 'u', 'ừ': 'u',
      'ứ': 'u', 'ự': 'u', 'ử': 'u', 'ữ': 'u', 'ỳ': 'y', 'ỵ': 'y', 'ỷ': 'y',
      'ỹ': 'y', 'đ': 'd',
    };
    Object.keys(charMap).forEach((key) => {
      expect(slug(`foo ${key} bar baz`)).to.equal(`foo-${charMap[key]}-bar-baz`);
    });
  });

  it('should replace currencies', () => {
    const charMap = {
      '€': 'euro', '₢': 'cruzeiro', '₣': 'french franc', '£': 'pound',
      '₤': 'lira', '₥': 'mill', '₦': 'naira', '₧': 'peseta', '₨': 'rupee', '₹': 'indian rupee',
      '₩': 'won', '₪': 'new shequel', '₫': 'dong', '₭': 'kip', '₮': 'tugrik',
      '₯': 'drachma', '₰': 'penny', '₱': 'peso', '₲': 'guarani', '₳': 'austral',
      '₴': 'hryvnia', '₵': 'cedi', '¢': 'cent', '¥': 'yen', '元': 'yuan',
      '円': 'yen', '﷼': 'rial', '₠': 'ecu', '¤': 'currency', '฿': 'baht',
      '$': 'dollar',
    };
    Object.keys(charMap).forEach((key) => {
      const replacement = charMap[key].replace(' ', '-');
      expect(slug(`foo ${key} bar baz`))
        .to.equal(`foo-${replacement}-bar-baz`);
    });
  });

  it('should replace symbols in rfc3986 mode', () => {
    const charMap = {
      '©': 'c', 'œ': 'oe', 'Œ': 'OE', '∑': 'sum', '®': 'r',
      '∂': 'd', 'ƒ': 'f', '™': 'tm',
      '℠': 'sm', '…': '...', '˚': 'o', 'º': 'o', 'ª': 'a',
      '∆': 'delta', '∞': 'infinity', '♥': 'love', '&': 'and', '|': 'or',
      '<': 'less', '>': 'greater',
    };
    Object.keys(charMap).forEach((key) => {
      expect(slug(`foo ${key} bar baz`, {'mode': 'rfc3986'}))
        .to.equal(`foo-${charMap[key]}-bar-baz`.toLowerCase());
    });
  });

  it('should replace symbols in pretty mode', () => {
    const charMap = {
      '©': 'c', 'œ': 'oe', 'Œ': 'OE', '∑': 'sum', '®': 'r',
      '∂': 'd', 'ƒ': 'f', '™': 'tm',
      '℠': 'sm', '˚': 'o', 'º': 'o', 'ª': 'a',
      '∆': 'delta', '∞': 'infinity', '♥': 'love', '&': 'and', '|': 'or',
      '<': 'less', '>': 'greater',
    };
    Object.keys(charMap).forEach((key) => {
      expect(slug(`foo ${key} bar baz`, {'mode': 'pretty'}))
        .to.equal(`foo-${charMap[key]}-bar-baz`);
    });
  });

  it('should remove ellipsis in pretty mode', () => {
    const charMap = {
      '…': '...',
    };
    Object.keys(charMap).forEach((key) => {
      expect(slug(`foo ${key} bar baz`))
        .to.equal('foo-bar-baz');
    });
  });

  it('should strip … symbols in pretty mode', () => {
    expect(slug('foo … bar baz'))
      .to.equal('foo-bar-baz');
  });

  it('should strip symbols', () => {
    const charMap = [
      '†', '“', '”', '‘', '’', '•',
    ];
    Object.keys(charMap).forEach((key) => {
      expect(slug(`foo ${charMap[key]} bar baz`))
        .to.equal('foo-bar-baz');
    });
  });

  it('should replace unicode', () => {
    const charMap = {
      '☢': 'radioactive', '☠': 'skull-and-bones', '☤': 'caduceus',
      '☣': 'biohazard', '☭': 'hammer-and-sickle', '☯': 'yin-yang', '☮': 'peace',
      '☏': 'telephone', '☔': 'umbrella-with-rain-drops', '☎': 'telephone',
      '☀': 'sun-with-rays', '★': 'star', '☂': 'umbrella', '☃': 'snowman',
      '✈': 'airplane', '✉': 'envelope', '✊': 'raised-fist',
    };
    Object.keys(charMap).forEach((key) => {
      expect(slug(`foo ${key} bar baz`))
        .to.equal(`foo-${charMap[key]}-bar-baz`);
    });
  });

  it('should replace no unicode when disabled', () => {
    const charMap = '😹☢☠☤☣☭☯☮☏☔☎☀★☂☃✈✉✊'.split('');
    Object.keys(charMap).forEach((key) => {
      expect(slug(`foo ${charMap[key]} bar baz`, {'replaceSymbols': false}))
        .to.equal('foo-bar-baz');
    });
  });

  it('should allow altering the charmap', () => {
    const charmap = {
      'f': 'ph', 'o': '0', 'b': '8', 'a': '4', 'r': '2', 'z': '5',
    };
    expect(slug('foo bar baz', {charmap}).toUpperCase())
      .to.equal('PH00-842-845');
  });

  it('should replace lithuanian characters', () => {
    expect(slug('ąčęėįšųūžĄČĘĖĮŠŲŪŽ'))
      .to.equal('aceeisuuzACEEISUUZ');
  });

  it('should replace multichars', () => {
    expect(slug('w/ <3 && sugar || ☠'))
      .to.equal('with-love-and-sugar-or-skull-and-bones');
  });

  it('should be flavourable', () => {
    expect(slug('It\'s your journey ... we guide you through.', {'mode': 'pretty'}))
      .to.equal('Its-your-journey-we-guide-you-through');
  });

  it('should default to lowercase in rfc3986 mode', () => {
    expect(slug('It\'s Your Journey We Guide You Through.', {'mode': 'rfc3986'}))
      .to.equal('its-your-journey-we-guide-you-through.');
  });

  it('should allow disabling of lowercase', () => {
    expect(slug('It\'s Your Journey We Guide You Through.', {'mode': 'rfc3986', 'lower': false}))
      .to.equal('Its-Your-Journey-We-Guide-You-Through.');
  });
});
